import React, { useCallback, useMemo, useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Modal, Dimensions, TouchableOpacity, Text, Platform, ScrollView, FlatList } from 'react-native';
import EmojiSearch from './EmojiSearch';
import EmojiTabs from './EmojiTabs';
import { XIcon } from '../../assets/icons';
import { groupEmojisByCategory, searchEmojis } from '../../utils/emojiUtils';
import { EmojiData } from '../../types/emoji';

interface Section {
  title: string;
  data: EmojiData[];
}

interface EmojiPickerContentProps {
  onEmojiSelect: (emoji: string) => void;
  emojis: EmojiData[];
  onClose: () => void;
}

interface EmojiPickerProps extends EmojiPickerContentProps {
  visible: boolean;
}

interface CategoryProps {
  title: string;
  emojis: EmojiData[];
  onEmojiSelect: (emoji: string) => void;
  onLayout?: (title: string, y: number) => void;
  isSearchMode?: boolean;
}

// Separate category component for better performance
const Category = React.memo(({ title, emojis, onEmojiSelect, onLayout, isSearchMode }: CategoryProps) => {
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

  return (
    <View 
      style={styles.categoryContainer}
      onLayout={handleLayout}
    >
      <Text style={styles.categoryTitle}>{title}</Text>
      <View style={[
        styles.emojiGrid, 
        isSearchMode && styles.searchEmojiGrid
      ]}>
        {emojis.map((emoji, index) => (
          <TouchableOpacity
            key={`${emoji.emoji}-${index}`}
            style={styles.emojiButton}
            onPress={() => onEmojiSelect(emoji.emoji)}
          >
            <Text style={styles.emojiText}>{emoji.emoji}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
});

// Component with just the content, no modal
export function EmojiPickerContent({ onEmojiSelect, emojis, onClose }: EmojiPickerContentProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const categoryPositions = useRef<Record<string, number>>({});
  
  // Reset refs on mount
  useEffect(() => {
    categoryPositions.current = {};
    return () => {
      // Clean up on unmount
      categoryPositions.current = {};
    };
  }, []);
  
  // Group emojis by category
  const emojiSections = useMemo(() => {
    if (!emojis?.length) return [];
    
    // Process for search or regular display
    const processedEmojis = searchQuery
      ? searchEmojis(emojis, searchQuery)
      : emojis;
    
    return groupEmojisByCategory(processedEmojis);
  }, [emojis, searchQuery]);
  
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

  // Boolean to track if we're in search mode
  const isSearchMode = !!searchQuery;

  return (
    <View style={styles.contentContainer}>
      <EmojiSearch value={searchQuery} onChangeText={setSearchQuery} />
      
      {!isSearchMode && (
        <EmojiTabs 
          categories={emojiSections.map(section => section.title)} 
          activeCategory={activeCategory} 
          onCategoryPress={handleCategoryPress} 
        />
      )}
      
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {isSearchMode && totalSearchResults === 0 ? (
          <View style={styles.noResultsContainer}>
            <Text style={styles.noResultsText}>No emojis found</Text>
          </View>
        ) : (
          emojiSections.map(section => (
            <Category
              key={section.title}
              title={section.title}
              emojis={section.data}
              onEmojiSelect={onEmojiSelect}
              onLayout={handleCategoryLayout}
              isSearchMode={isSearchMode}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}

// Modal wrapper component
function EmojiPicker({ onEmojiSelect, emojis, visible, onClose }: EmojiPickerProps) {
  // Don't render anything if not visible
  if (!visible) return null;

  return (
    <Modal
      visible={true}
      transparent={true}
      animationType="fade"
      hardwareAccelerated={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Pick an emoji</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <XIcon size={24} color="#666" />
            </TouchableOpacity>
          </View>
          
          <EmojiPickerContent 
            onEmojiSelect={onEmojiSelect} 
            emojis={emojis} 
            onClose={onClose} 
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

export default EmojiPicker;