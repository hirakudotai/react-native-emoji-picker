import React, { useCallback, useMemo } from 'react';
import { View, Text, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { useEmojiPickerTheme } from '../theme';
import { FlatListItem, Section } from '../components/EmojiPicker/types';
import { EmojiData } from '../types/emoji';
import { styles } from '../components/EmojiPicker/styles';

export interface UseEmojiPickerRendererProps {
  // From useEmojiPicker
  onEmojiSelect: (emoji: string) => void;
  getModifiedEmoji: (emoji: string) => string;
  updateRecentEmojis: (emoji: string) => void;
  selectedSkinTone: string;
  emojiSections: Section[];
  searchQuery: string;

  // Layout
  columns?: number;

  // Behavior
  showSearchBar?: boolean;

  // Styles
  categoryHeaderStyle?: TextStyle;
  categoryContainerStyle?: ViewStyle;
  emojiButtonStyle?: ViewStyle;
  noResultsStyle?: TextStyle;

  // Custom renders
  categoryNameMap?: Record<string, string>;
  renderCategoryHeader?: (props: {
    category: string;
    displayName: string;
  }) => React.ReactNode;
}

export function useEmojiPickerRenderer({
  onEmojiSelect,
  getModifiedEmoji,
  updateRecentEmojis,
  selectedSkinTone,
  emojiSections,
  searchQuery,
  showSearchBar = true,
  columns = 6,
  categoryHeaderStyle,
  categoryContainerStyle,
  emojiButtonStyle,
  noResultsStyle,
  categoryNameMap,
  renderCategoryHeader,
}: UseEmojiPickerRendererProps) {
  const { theme } = useEmojiPickerTheme();

  const CATEGORY_MARGIN_V = 8;
  const CATEGORY_PADDING_H = 12;
  const EMOJI_BUTTON_PADDING = 4;
  const EMOJI_GRID_PADDING_H = 4;
  const NO_RESULTS_PADDING = 30;
  const NO_RESULTS_FONT_SIZE = 16;

  const themedStyles = useMemo(() => ({
    categoryTitle: theme.colors.categoryTitle,
    categoryDivider: theme.colors.categoryDivider,
    noResults: theme.colors.noResults,
    emojiButtonBackground: theme.colors.emojiButtonBackground,
  }), [theme]);

  const isSearchMode = !!searchQuery && showSearchBar;

  const handleEmojiSelect = useCallback((emoji: string) => {
    const finalEmoji = getModifiedEmoji(emoji);
    updateRecentEmojis(emoji);
    onEmojiSelect(finalEmoji);
  }, [onEmojiSelect, getModifiedEmoji, updateRecentEmojis]);

  const renderItem = useCallback(({ item }: { item: FlatListItem }) => {
    if (item.type === 'header') {
      const titleStyle = [
        styles.categoryTitle,
        {
          color: themedStyles.categoryTitle,
          borderBottomColor: themedStyles.categoryDivider,
        },
        categoryHeaderStyle,
      ];

      const displayName = categoryNameMap?.[item.category] || item.category;

      if (renderCategoryHeader) {
        return (
          <View style={[
            styles.categoryContainer,
            { marginVertical: CATEGORY_MARGIN_V, paddingHorizontal: CATEGORY_PADDING_H },
            categoryContainerStyle,
          ]}>
            {renderCategoryHeader({ category: item.category, displayName })}
          </View>
        );
      }

      return (
        <View style={[
          styles.categoryContainer,
          { marginVertical: CATEGORY_MARGIN_V, paddingHorizontal: CATEGORY_PADDING_H },
          categoryContainerStyle,
        ]}>
          <Text style={titleStyle}>{displayName}</Text>
        </View>
      );
    }

    const dynamicFontSize = Math.min(40, Math.max(16, 28 * (6 / columns)));

    return (
      <View style={[styles.emojiGrid, { paddingHorizontal: EMOJI_GRID_PADDING_H }]}>
        {item.emojis.map((emoji: EmojiData, index: number) => {
          const displayEmoji = (emoji.skin_tones && selectedSkinTone)
            ? emoji.emoji + selectedSkinTone
            : emoji.emoji;

          return (
            <TouchableOpacity
              key={`${emoji.emoji}-${index}`}
              style={[
                styles.emojiButton,
                {
                  width: `${100 / columns}%` as `${number}%`,
                  padding: EMOJI_BUTTON_PADDING,
                  backgroundColor: themedStyles.emojiButtonBackground,
                },
                emojiButtonStyle,
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
  }, [
    handleEmojiSelect,
    themedStyles,
    categoryHeaderStyle,
    categoryNameMap,
    categoryContainerStyle,
    columns,
    selectedSkinTone,
    emojiButtonStyle,
    renderCategoryHeader,
  ]);

  const renderEmptyComponent = useCallback(() => {
    if (isSearchMode && emojiSections.length === 0) {
      return (
        <View style={[styles.noResultsContainer, { padding: NO_RESULTS_PADDING }]}>
          <Text style={[
            styles.noResultsText,
            { fontSize: NO_RESULTS_FONT_SIZE, color: themedStyles.noResults },
            noResultsStyle,
          ]}>
            No emojis found
          </Text>
        </View>
      );
    }
    return null;
  }, [isSearchMode, emojiSections.length, themedStyles.noResults, noResultsStyle]);

  return {
    renderItem,
    renderEmptyComponent,
  };
}
