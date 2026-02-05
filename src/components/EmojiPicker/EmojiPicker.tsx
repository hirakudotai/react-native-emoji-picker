import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import EmojiSearch from './EmojiSearch';
import EmojiTabs from './EmojiTabs';
import { useEmojiPicker } from '../../hooks/useEmojiPicker';
import { EmojiPickerThemeProvider, useEmojiPickerTheme } from '../../theme';
import { EmojiPickerProps, FlatListItem } from './types';
import { SkinToneSelector } from './SkinToneSelector';
import { styles } from './styles';

// Internal content component (uses theme from context)
function EmojiPickerInternal({ 
  onEmojiSelect, 
  emojis, 
  onClose, 
  // Feature toggles
  showHistoryTab = true,
  showSearchBar = true,
  showTabs = true,
  showSkinToneSelector = false,
  showSearchIcon = true,
  // Category filtering and ordering
  excludeCategories,
  includeCategories,
  categoryOrder,
  categoryNameMap,
  // Emoji filtering
  excludeEmojis,
  includeEmojis,
  // Layout
  columns = 6,
  // Behavior
  maxRecentEmojis = 20,
  defaultSkinTone = '',
  searchDebounceMs = 150,
  searchMinChars = 2,
  animationType = 'fade',
  // Styles
  containerStyle,
  searchBarStyle,
  searchInputStyle,
  tabsContainerStyle,
  tabStyle,
  activeTabStyle,
  categoryHeaderStyle,
  categoryContainerStyle,
  emojiButtonStyle,
  skinToneSelectorStyle,
  skinToneButtonStyle,
  noResultsStyle,
  // Custom text/colors
  searchPlaceholder,
  tabIconColors,
  // Theme
  darkMode = false,
  theme: customTheme,
  // Custom renders
  renderCustomTabs,
  renderCustomSearch,
  renderCustomSkinToneSelector,
  renderCategoryHeader,
  // FlatList performance
  initialNumToRender = 30,
  maxToRenderPerBatch = 20,
  updateCellsBatchingPeriod = 50,
  windowSize = 10,
  removeClippedSubviews = true,
}: EmojiPickerProps) {
  const { theme } = useEmojiPickerTheme();
  
  // Default layout values
  const CATEGORY_MARGIN_V = 8;
  const CATEGORY_PADDING_H = 12;
  const EMOJI_BUTTON_PADDING = 4;
  const EMOJI_GRID_PADDING_H = 4;
  const NO_RESULTS_PADDING = 30;
  const NO_RESULTS_FONT_SIZE = 16;
  
  // Memoize theme-dependent styles to avoid recreating on every render
  const themedStyles = useMemo(() => ({
    background: theme.colors.background,
    categoryTitle: theme.colors.categoryTitle,
    categoryDivider: theme.colors.categoryDivider,
    noResults: theme.colors.noResults,
    emojiButtonBackground: theme.colors.emojiButtonBackground,
    skinToneButtonBorder: theme.colors.skinToneButtonBorder,
    accent: theme.colors.accent,
  }), [theme]);
  
  // Filter emojis based on include/exclude lists (only if filtering is needed)
  const filteredEmojis = useMemo(() => {
    // Skip filtering if no filters are provided
    const hasFilters = 
      (includeEmojis && includeEmojis.length > 0) ||
      (excludeEmojis && excludeEmojis.length > 0) ||
      (includeCategories && includeCategories.length > 0) ||
      (excludeCategories && excludeCategories.length > 0);
    
    if (!hasFilters) {
      return emojis;
    }
    
    let filtered = emojis;
    
    // Apply emoji filtering
    if (includeEmojis && includeEmojis.length > 0) {
      filtered = filtered.filter(emoji => includeEmojis.includes(emoji.emoji));
    } else if (excludeEmojis && excludeEmojis.length > 0) {
      filtered = filtered.filter(emoji => !excludeEmojis.includes(emoji.emoji));
    }
    
    // Apply category filtering
    if (includeCategories && includeCategories.length > 0) {
      filtered = filtered.filter(emoji => includeCategories.includes(emoji.category));
    } else if (excludeCategories && excludeCategories.length > 0) {
      filtered = filtered.filter(emoji => !excludeCategories.includes(emoji.category));
    }
    
    return filtered;
  }, [emojis, includeEmojis, excludeEmojis, includeCategories, excludeCategories]);
  
  const {
    searchQuery,
    setSearchQuery: handleSearch,
    activeCategory,
    setActiveCategory,
    selectedSkinTone,
    setSelectedSkinTone,
    emojiSections,
    flatListData,
    updateRecentEmojis,
    getModifiedEmoji,
  } = useEmojiPicker({
    emojis: filteredEmojis,
    showHistoryTab,
    maxRecentEmojis,
    defaultSkinTone,
    columns,
  });

  const flatListRef = useRef<FlatList>(null);
  
  // Apply category ordering if specified (skip if not needed)
  const orderedEmojiSections = useMemo(() => {
    if (!categoryOrder || categoryOrder.length === 0) {
      return emojiSections;
    }
    
    const sectionMap = new Map(emojiSections.map(section => [section.title, section]));
    const ordered: typeof emojiSections = [];
    
    categoryOrder.forEach(categoryName => {
      const section = sectionMap.get(categoryName);
      if (section) {
        ordered.push(section);
        sectionMap.delete(categoryName);
      }
    });
    
    sectionMap.forEach(section => {
      ordered.push(section);
    });
    
    return ordered;
  }, [emojiSections, categoryOrder]);
  
  // Use flatListData from hook if no reordering, otherwise rebuild
  // Note: This must be defined before handleCategoryPress which uses it
  const finalFlatListData = useMemo(() => {
    // If no custom ordering, use the flatListData from hook directly
    if (!categoryOrder || categoryOrder.length === 0) {
      return flatListData;
    }
    
    // Otherwise rebuild with ordered sections
    const items: any[] = [];
    const EMOJIS_PER_ROW = columns;
    
    orderedEmojiSections.forEach((section, sectionIndex) => {
      items.push({
        type: 'header',
        category: section.title,
        id: `header-${sectionIndex}`
      });
      
      const emojis = section.data;
      for (let i = 0; i < emojis.length; i += EMOJIS_PER_ROW) {
        const rowEmojis = emojis.slice(i, i + EMOJIS_PER_ROW);
        items.push({
          type: 'emojiRow',
          emojis: rowEmojis,
          id: `row-${sectionIndex}-${i}`
        });
      }
    });
    
    return items;
  }, [categoryOrder, flatListData, orderedEmojiSections, columns]);
  
  // Handle emoji selection
  const handleEmojiSelect = useCallback((emoji: string) => {
    const finalEmoji = getModifiedEmoji(emoji);
    updateRecentEmojis(emoji);
    onEmojiSelect(finalEmoji);
  }, [onEmojiSelect, getModifiedEmoji, updateRecentEmojis]);

  const handleCategoryPress = useCallback((category: string) => {
    setActiveCategory(category);
    
    // Find the index of the header item for this category in finalFlatListData
    const headerIndex = finalFlatListData.findIndex(
      item => item.type === 'header' && item.category === category
    );
    
    if (flatListRef.current && headerIndex !== -1) {
      // scrollToIndex with proper error handling via onScrollToIndexFailed
      flatListRef.current.scrollToIndex({
        index: headerIndex,
        animated: true,
        viewPosition: 0
      });
    }
  }, [finalFlatListData, setActiveCategory]);

  // Boolean to track if we're in search mode
  const isSearchMode = !!searchQuery && showSearchBar;

  // Render individual FlatList items (can be header or emoji row)
  const renderItem = useCallback(({ item }: { item: FlatListItem }) => {
    if (item.type === 'header') {
      const titleStyle = [
        styles.categoryTitle,
        {
          color: themedStyles.categoryTitle,
          borderBottomColor: themedStyles.categoryDivider,
        },
        categoryHeaderStyle
      ];

      // Get display name from map or use original title
      const displayName = categoryNameMap?.[item.category] || item.category;

      if (renderCategoryHeader) {
        return (
          <View style={[
            styles.categoryContainer,
            {
              marginVertical: CATEGORY_MARGIN_V,
              paddingHorizontal: CATEGORY_PADDING_H
            },
            categoryContainerStyle
          ]}>
            {renderCategoryHeader({
              category: item.category,
              displayName,
            })}
          </View>
        );
      }

      return (
        <View style={[
          styles.categoryContainer,
          {
            marginVertical: CATEGORY_MARGIN_V,
            paddingHorizontal: CATEGORY_PADDING_H
          },
          categoryContainerStyle
        ]}>
          <Text style={titleStyle}>{displayName}</Text>
        </View>
      );
    }

    // Calculate dynamic font size based on columns
    // Default is 28 for 6 columns. 
    const dynamicFontSize = Math.min(40, Math.max(16, 28 * (6 / columns)));

    // Render row of emojis
    return (
      <View style={[styles.emojiGrid, { paddingHorizontal: EMOJI_GRID_PADDING_H }]}>
        {item.emojis.map((emoji, index) => {
          const displayEmoji = (emoji.skin_tones && selectedSkinTone) 
            ? emoji.emoji + selectedSkinTone 
            : emoji.emoji;
            
          return (
            <TouchableOpacity
              key={`${emoji.emoji}-${index}`}
              style={[
                styles.emojiButton, 
                { 
                  width: `${100 / columns}%`,
                  padding: EMOJI_BUTTON_PADDING,
                  backgroundColor: themedStyles.emojiButtonBackground
                },
                emojiButtonStyle
              ]}
              onPress={() => handleEmojiSelect(emoji.emoji)}
              accessibilityRole="button"
              accessibilityLabel={`${emoji.description} emoji`}
              accessibilityHint="Double tap to select this emoji"
            >
              <Text style={[styles.emojiText, { fontSize: dynamicFontSize }]}>
                {displayEmoji}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }, [handleEmojiSelect, themedStyles, categoryHeaderStyle, categoryNameMap, categoryContainerStyle, columns, selectedSkinTone, emojiButtonStyle, renderCategoryHeader]);

  // Render empty state
  const renderEmptyComponent = useCallback(() => {
    if (isSearchMode && orderedEmojiSections.length === 0) {
      return (
        <View style={[styles.noResultsContainer, { padding: NO_RESULTS_PADDING }]}>
          <Text style={[
            styles.noResultsText, 
            { fontSize: NO_RESULTS_FONT_SIZE, color: themedStyles.noResults },
            noResultsStyle
          ]}>
            No emojis found
          </Text>
        </View>
      );
    }
    return null;
  }, [isSearchMode, orderedEmojiSections.length, themedStyles.noResults, noResultsStyle]);

  // Render search bar
  const renderSearch = () => {
    if (!showSearchBar) return null;
    
    if (renderCustomSearch) {
      return renderCustomSearch({
        onSearch: handleSearch,
        searchQuery,
      });
    }
    
    return (
      <EmojiSearch 
        onSearch={handleSearch}
        debounceMs={searchDebounceMs}
        minChars={searchMinChars}
        placeholderText={searchPlaceholder}
        searchBarStyle={searchBarStyle}
        searchInputStyle={searchInputStyle}
        showSearchIcon={showSearchIcon}
        containerStyle={containerStyle}
      />
    );
  };

  // Render skin tone selector
  const renderSkinTone = () => {
    if (!showSkinToneSelector) return null;
    
    return (
      <SkinToneSelector
        selectedSkinTone={selectedSkinTone}
        onSkinToneChange={setSelectedSkinTone}
        skinToneSelectorStyle={skinToneSelectorStyle}
        skinToneButtonStyle={skinToneButtonStyle}
        renderCustomSkinToneSelector={renderCustomSkinToneSelector}
      />
    );
  };

  // Render tabs
  const renderTabs = () => {
    if (isSearchMode || !showTabs) return null;
    
    if (renderCustomTabs) {
      return renderCustomTabs({
        categories: orderedEmojiSections.map(section => section.title),
        activeCategory,
        onCategoryPress: handleCategoryPress,
      });
    }
    
    return (
      <EmojiTabs 
        categories={orderedEmojiSections.map(section => section.title)} 
        activeCategory={activeCategory} 
        onCategoryPress={handleCategoryPress}
        tabIconColors={tabIconColors}
        tabsContainerStyle={tabsContainerStyle}
        tabStyle={tabStyle}
        activeTabStyle={activeTabStyle}
      />
    );
  };

  return (
    <View style={[
      styles.contentContainer, 
      { backgroundColor: themedStyles.background },
      containerStyle
    ]}>
      <View style={containerStyle}>
        {renderSearch()}
      </View>
      
      <View style={containerStyle}>
        {renderSkinTone()}
      </View>
      
      <View style={containerStyle}>
        {renderTabs()}
      </View>
      
      <FlatList
        ref={flatListRef}
        data={finalFlatListData}
        renderItem={renderItem}
        ListEmptyComponent={renderEmptyComponent}
        keyExtractor={(item) => item.id}
        style={[styles.scrollView, { backgroundColor: themedStyles.background }, containerStyle]}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={removeClippedSubviews}
        maxToRenderPerBatch={maxToRenderPerBatch}
        updateCellsBatchingPeriod={updateCellsBatchingPeriod}
        initialNumToRender={initialNumToRender}
        windowSize={windowSize}
        nestedScrollEnabled={true}
        onScrollToIndexFailed={(info) => {
          // When scrollToIndex fails (item not yet rendered), scroll to approximate offset first
          // This forces FlatList to render items in that area
          flatListRef.current?.scrollToOffset({
            offset: info.averageItemLength * info.index,
            animated: false
          });
          
          // Then retry scrolling to the exact index once items are rendered
          setTimeout(() => {
            flatListRef.current?.scrollToIndex({ 
              index: info.index, 
              animated: true,
              viewPosition: 0
            });
          }, 500);
        }}
      />
    </View>
  );
}

// Public component with optional theme provider (for standalone use)
export function EmojiPicker(props: EmojiPickerProps) {
  const { darkMode = false, theme } = props;
  
  // Only wrap with provider if theme customization is explicitly provided
  if (theme || darkMode) {
    return (
      <EmojiPickerThemeProvider darkMode={darkMode} theme={theme}>
        <EmojiPickerInternal {...props} />
      </EmojiPickerThemeProvider>
    );
  }
  
  // Otherwise use default theme without extra provider
  return <EmojiPickerInternal {...props} />;
}
