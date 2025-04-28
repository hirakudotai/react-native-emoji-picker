import React, { useCallback, useMemo, useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Modal, Dimensions, TouchableOpacity, Text, Platform, ScrollView, FlatList, ViewStyle, TextStyle } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EmojiSearch from './EmojiSearch';
import EmojiTabs from './EmojiTabs';
import { XIcon } from '../../assets/icons';
import { groupEmojisByCategory, searchEmojis } from '../../utils/emojiUtils';
import { EmojiData } from '../../types/emoji';

// Maximum number of recently used emojis to keep
const MAX_RECENT_EMOJIS = 20;

// AsyncStorage key for persisting recently used emojis
const STORAGE_KEY = 'emoji_picker_recent_emojis';

interface Section {
  title: string;
  data: EmojiData[];
}

interface EmojiPickerContentProps {
  onEmojiSelect: (emoji: string) => void;
  emojis: EmojiData[];
  onClose: () => void;
  showHistoryTab?: boolean;
  showSearchBar?: boolean;
  showTabs?: boolean;
  tabIconColors?: Record<string, string>;
  // Search box customization props
  searchContainerStyle?: ViewStyle;
  searchInputStyle?: TextStyle;
  searchPlaceholder?: string;
  searchPlaceholderColor?: string;
  searchIconColor?: string;
  clearIconColor?: string;
  // Tab styling customization props
  activeTabStyle?: ViewStyle;
  tabStyle?: ViewStyle;
  // Theme props
  darkMode?: boolean;
  // Category title customization
  categoryTitleStyle?: TextStyle;
  categoryTitleAlign?: 'left' | 'center' | 'right';
}

interface EmojiPickerProps extends EmojiPickerContentProps {
  visible: boolean;
  // Modal customization props
  modalTitle?: string;
  modalTitleStyle?: TextStyle;
  modalStyle?: ViewStyle;
  modalBackgroundColor?: string;
  modalBorderRadius?: number;
  modalHeaderStyle?: ViewStyle;
  modalCloseIconColor?: string;
  modalCloseIconSize?: number;
  modalCloseIconStyle?: ViewStyle;
}

interface CategoryProps {
  title: string;
  emojis: EmojiData[];
  onEmojiSelect: (emoji: string) => void;
  onLayout?: (title: string, y: number) => void;
  isSearchMode?: boolean;
  darkMode?: boolean;
  categoryTitleStyle?: TextStyle;
  categoryTitleAlign?: 'left' | 'center' | 'right';
}

// Separate category component for better performance
const Category = React.memo(({ 
  title, 
  emojis, 
  onEmojiSelect, 
  onLayout, 
  isSearchMode, 
  darkMode = false,
  categoryTitleStyle,
  categoryTitleAlign = 'left'
}: CategoryProps) => {
  const handleLayout = useCallback((event: any) => {
    if (onLayout) {
      const { y } = event.nativeEvent.layout;
      onLayout(title, y);
    }
  }, [title, onLayout]);

  // Skip rendering empty categories
  if (emojis.length === 0) {
    return null;
  }

  // Get theme specific styles
  const themeStyles = darkMode ? darkThemeStyles : styles;

  // Apply alignment to title
  const titleStyle = [
    themeStyles.categoryTitle,
    categoryTitleStyle,
    { textAlign: categoryTitleAlign }
  ];

  return (
    <View 
      style={themeStyles.categoryContainer}
      onLayout={handleLayout}
    >
      <Text style={titleStyle}>{title}</Text>
      <View style={[
        themeStyles.emojiGrid, 
        isSearchMode && themeStyles.searchEmojiGrid
      ]}>
        {emojis.map((emoji, index) => (
          <TouchableOpacity
            key={`${emoji.emoji}-${index}`}
            style={themeStyles.emojiButton}
            onPress={() => onEmojiSelect(emoji.emoji)}
          >
            <Text style={themeStyles.emojiText}>{emoji.emoji}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
});

// Component with just the content, no modal
export function EmojiPickerContent({ 
  onEmojiSelect, 
  emojis, 
  onClose, 
  showHistoryTab = true,
  showSearchBar = true,
  showTabs = true,
  tabIconColors,
  // Search box customization props
  searchContainerStyle,
  searchInputStyle,
  searchPlaceholder,
  searchPlaceholderColor,
  searchIconColor,
  clearIconColor,
  // Tab styling customization props
  activeTabStyle,
  tabStyle,
  // Theme props
  darkMode = false,
  // Category title customization
  categoryTitleStyle,
  categoryTitleAlign
}: EmojiPickerContentProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [recentEmojis, setRecentEmojis] = useState<EmojiData[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);
  const categoryPositions = useRef<Record<string, number>>({});
  
  // Reset refs on mount
  useEffect(() => {
    categoryPositions.current = {};
    
    // Load recently used emojis if enabled
    const loadRecentEmojis = async () => {
      if (!showHistoryTab) return;
      
      try {
        const recentEmojisJson = await AsyncStorage.getItem(STORAGE_KEY);
        if (recentEmojisJson) {
          const parsed = JSON.parse(recentEmojisJson);
          setRecentEmojis(parsed);
        }
      } catch (error) {
        console.error('Failed to load recent emojis:', error);
      }
    };
    
    loadRecentEmojis();
    
    return () => {
      // Clean up on unmount
      categoryPositions.current = {};
    };
  }, [showHistoryTab]);
  
  // Handle emoji selection with recently used tracking
  const handleEmojiSelect = useCallback((emoji: string) => {
    // Find the emoji data object for the selected emoji
    const selectedEmojiData = emojis.find(e => e.emoji === emoji);
    
    if (selectedEmojiData && showHistoryTab) {
      // Update recent emojis
      setRecentEmojis(prevRecent => {
        // Remove if already exists to avoid duplicates
        const filteredRecent = prevRecent.filter(e => e.emoji !== emoji);
        
        // Add to the beginning of the array and limit size
        const newRecent = [selectedEmojiData, ...filteredRecent].slice(0, MAX_RECENT_EMOJIS);
        
        // Persist to storage
        const saveRecentEmojis = async () => {
          try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newRecent));
          } catch (error) {
            console.error('Failed to save recent emojis:', error);
          }
        };
        
        saveRecentEmojis();
        
        return newRecent;
      });
    }
    
    // Call the original onEmojiSelect handler
    onEmojiSelect(emoji);
  }, [emojis, onEmojiSelect, showHistoryTab]);

  // Group emojis by category, including recently used
  const emojiSections = useMemo(() => {
    if (!emojis?.length) return [];
    
    // Process for search or regular display
    const processedEmojis = searchQuery
      ? searchEmojis(emojis, searchQuery)
      : emojis;
    
    // Get grouped categories
    const categories = groupEmojisByCategory(processedEmojis);
    
    // Add recently used section if we have any, not in search mode, and the feature is enabled
    if (recentEmojis.length > 0 && !searchQuery && showHistoryTab) {
      return [
        { title: 'Recently Used', data: recentEmojis },
        ...categories
      ];
    }
    
    return categories;
  }, [emojis, searchQuery, recentEmojis, showHistoryTab]);
  
  // Count total emojis in search results
  const totalSearchResults = useMemo(() => {
    if (!searchQuery) return emojis.length;
    return emojiSections.reduce((total, section) => total + section.data.length, 0);
  }, [emojiSections, searchQuery, emojis.length]);
  
  // Set first category as active by default
  useEffect(() => {
    if (emojiSections.length > 0 && !activeCategory) {
      setActiveCategory(emojiSections[0].title);
    }
  }, [emojiSections, activeCategory]);

  const handleCategoryLayout = useCallback((title: string, y: number) => {
    // Store the actual measured position of each category
    categoryPositions.current[title] = y;
  }, []);
  
  const handleCategoryPress = useCallback((category: string) => {
    setActiveCategory(category);
    
    // Scroll to the measured position of the category
    if (scrollViewRef.current && categoryPositions.current[category] !== undefined) {
      // Add a small offset to account for header elements
      const scrollPosition = Math.max(0, categoryPositions.current[category] - 10);
      
      scrollViewRef.current.scrollTo({
        y: scrollPosition,
        animated: true
      });
    }
  }, []);

  // Get theme specific styles
  const themeStyles = darkMode ? darkThemeStyles : styles;

  // Boolean to track if we're in search mode
  const isSearchMode = !!searchQuery && showSearchBar;

  return (
    <View style={[themeStyles.contentContainer, darkMode && {backgroundColor: '#1a1a1a'}]}>
      {showSearchBar && (
        <EmojiSearch 
          value={searchQuery} 
          onChangeText={setSearchQuery}
          searchContainerStyle={darkMode ? 
            {...(searchContainerStyle as ViewStyle), backgroundColor: '#333', borderColor: '#555'} : 
            searchContainerStyle
          }
          searchInputStyle={darkMode ? 
            {...(searchInputStyle as TextStyle), color: '#f5f5f5'} : 
            searchInputStyle
          }
          placeholderText={searchPlaceholder}
          placeholderTextColor={darkMode ? searchPlaceholderColor || '#888' : searchPlaceholderColor}
          searchIconColor={darkMode ? searchIconColor || '#888' : searchIconColor}
          clearIconColor={darkMode ? clearIconColor || '#888' : clearIconColor}
          darkMode={darkMode}
        />
      )}
      
      {!isSearchMode && showTabs && (
        <EmojiTabs 
          categories={emojiSections.map(section => section.title)} 
          activeCategory={activeCategory} 
          onCategoryPress={handleCategoryPress}
          tabIconColors={tabIconColors}
          activeTabStyle={darkMode ? 
            {...(activeTabStyle as ViewStyle), backgroundColor: '#333'} : 
            activeTabStyle
          }
          tabStyle={tabStyle}
          darkMode={darkMode}
        />
      )}
      
      <ScrollView
        ref={scrollViewRef}
        style={themeStyles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {isSearchMode && totalSearchResults === 0 ? (
          <View style={themeStyles.noResultsContainer}>
            <Text style={themeStyles.noResultsText}>No emojis found</Text>
          </View>
        ) : (
          emojiSections.map(section => (
            <Category
              key={section.title}
              title={section.title}
              emojis={section.data}
              onEmojiSelect={handleEmojiSelect}
              onLayout={handleCategoryLayout}
              isSearchMode={isSearchMode}
              darkMode={darkMode}
              categoryTitleStyle={categoryTitleStyle}
              categoryTitleAlign={categoryTitleAlign}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}

// Modal wrapper component
function EmojiPicker({ 
  onEmojiSelect, 
  emojis, 
  visible, 
  onClose, 
  showHistoryTab = true,
  showSearchBar = true,
  showTabs = true,
  tabIconColors,
  // Search box customization props
  searchContainerStyle,
  searchInputStyle,
  searchPlaceholder,
  searchPlaceholderColor,
  searchIconColor,
  clearIconColor,
  // Tab styling customization props
  activeTabStyle,
  tabStyle,
  // Modal customization props
  modalTitle = "Pick an emoji",
  modalTitleStyle,
  modalStyle,
  modalBackgroundColor,
  modalBorderRadius,
  modalHeaderStyle,
  modalCloseIconColor = "#666",
  modalCloseIconSize = 24,
  modalCloseIconStyle,
  // Theme props
  darkMode = false,
  // Category title customization
  categoryTitleStyle,
  categoryTitleAlign
}: EmojiPickerProps) {
  // Don't render anything if not visible
  if (!visible) return null;

  // Get theme specific styles
  const themeStyles = darkMode ? darkThemeStyles : styles;

  // Set default colors based on theme if not provided
  const defaultBackgroundColor = darkMode ? '#1a1a1a' : '#fff';
  const defaultCloseIconColor = darkMode ? '#aaa' : '#666';

  // Create a style object with the background color and border radius 
  // to ensure they take precedence over the default styles
  const containerStyle = [
    themeStyles.modalContainer,
    {
      ...(modalBackgroundColor ? { backgroundColor: modalBackgroundColor } : { backgroundColor: defaultBackgroundColor }),
      ...(modalBorderRadius !== undefined ? { borderRadius: modalBorderRadius } : {})
    },
    modalStyle
  ];

  const headerStyles = [
    themeStyles.header,
    modalHeaderStyle
  ];

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      hardwareAccelerated={true}
      onRequestClose={onClose}
    >
      <View style={themeStyles.modalOverlay}>
        <View style={containerStyle}>
          <View style={headerStyles}>
            <Text style={[themeStyles.headerTitle, modalTitleStyle]}>{modalTitle}</Text>
            <TouchableOpacity 
              onPress={onClose} 
              style={[styles.closeButton, modalCloseIconStyle]}
            >
              <XIcon 
                size={modalCloseIconSize} 
                color={modalCloseIconColor || defaultCloseIconColor} 
              />
            </TouchableOpacity>
          </View>
          
          <EmojiPickerContent 
            onEmojiSelect={onEmojiSelect} 
            emojis={emojis} 
            onClose={onClose}
            showHistoryTab={showHistoryTab}
            showSearchBar={showSearchBar}
            showTabs={showTabs}
            tabIconColors={tabIconColors}
            searchContainerStyle={searchContainerStyle}
            searchInputStyle={searchInputStyle}
            searchPlaceholder={searchPlaceholder}
            searchPlaceholderColor={searchPlaceholderColor}
            searchIconColor={searchIconColor}
            clearIconColor={clearIconColor}
            activeTabStyle={activeTabStyle}
            tabStyle={tabStyle}
            darkMode={darkMode}
            categoryTitleStyle={categoryTitleStyle}
            categoryTitleAlign={categoryTitleAlign}
          />
        </View>
      </View>
    </Modal>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: width * 0.9,
    height: height * 0.7,
    maxWidth: 450,
    maxHeight: 600,
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
      web: {
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.25)'
      }
    }),
  },
  contentContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 4,
  },
  scrollView: {
    flex: 1,
  },
  categoryContainer: {
    marginVertical: 8,
    paddingHorizontal: 12,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  emojiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  searchEmojiGrid: {
    justifyContent: 'flex-start',
    paddingLeft: 0,
  },
  emojiButton: {
    width: '16.66%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
    maxWidth: 60,
  },
  emojiText: {
    fontSize: 28,
  },
  noResultsContainer: {
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
    textAlign: 'center',
  },
});

// Dark theme styles
const darkThemeStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContainer: {
    width: width * 0.9,
    height: height * 0.7,
    maxWidth: 450,
    maxHeight: 600,
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
      },
      android: {
        elevation: 8,
      },
      web: {
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)'
      }
    }),
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f5f5f5',
  },
  closeButton: {
    padding: 4,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  categoryContainer: {
    marginVertical: 8,
    paddingHorizontal: 12,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#aaa',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  emojiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  searchEmojiGrid: {
    justifyContent: 'flex-start',
    paddingLeft: 0,
  },
  emojiButton: {
    width: '16.66%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
    maxWidth: 60,
  },
  emojiText: {
    fontSize: 28,
  },
  noResultsContainer: {
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#aaa',
    textAlign: 'center',
  },
});

export default EmojiPicker;