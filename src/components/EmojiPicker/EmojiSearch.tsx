import React, { useCallback, useState, useRef, useEffect, useMemo } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Platform, ViewStyle, TextStyle } from 'react-native';
import { SearchIcon, XIcon } from '../../assets/icons';
import { useEmojiPickerTheme } from '../../theme';

interface EmojiSearchProps {
  onSearch: (text: string) => void;
  debounceMs?: number;
  minChars?: number;
  placeholderText?: string;
  searchBarStyle?: ViewStyle;
  searchInputStyle?: TextStyle;
  showSearchIcon?: boolean;
  containerStyle?: ViewStyle;
}

function EmojiSearchInner({ 
  onSearch,
  debounceMs = 150,
  minChars = 2,
  placeholderText = "Search emojis...",
  searchBarStyle,
  searchInputStyle,
  showSearchIcon = true,
  containerStyle,
}: EmojiSearchProps) {
  const [inputValue, setInputValue] = useState('');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { theme } = useEmojiPickerTheme();
  
  // Default layout values
  const CONTAINER_PADDING_H = 16;
  const CONTAINER_PADDING_V = 8;
  const SEARCH_HEIGHT = 40;
  const SEARCH_BORDER_RADIUS = 10;
  const SEARCH_PADDING_H = 12;
  const ICON_SIZE = 18;
  const ICON_MARGIN = 8;
  const CLEAR_ICON_SIZE = 16;
  const INPUT_FONT_SIZE = 16;
  const CLEAR_BUTTON_PADDING = 4;
  
  // Memoize theme colors
  const themedColors = useMemo(() => ({
    placeholder: theme.colors.placeholder,
    searchIcon: theme.colors.icon,
    clearIcon: theme.colors.icon,
    background: theme.colors.background,
    searchBackground: theme.colors.searchBackground,
    text: theme.colors.text,
  }), [theme]);

  const handleChange = (text: string) => {
    // Update local input immediately
    setInputValue(text);
    
    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Debounce the parent callback
    timeoutRef.current = setTimeout(() => {
      onSearch(text.length >= minChars ? text : '');
    }, debounceMs);
  };

  const handleClear = () => {
    setInputValue('');
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    onSearch('');
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <View style={[
      styles.container, 
      {
        paddingHorizontal: CONTAINER_PADDING_H,
        paddingVertical: CONTAINER_PADDING_V,
        backgroundColor: themedColors.background,
      },
      containerStyle
    ]}>
      <View style={[
        styles.searchContainer,
        {
          height: SEARCH_HEIGHT,
          borderRadius: SEARCH_BORDER_RADIUS,
          paddingHorizontal: SEARCH_PADDING_H,
          backgroundColor: themedColors.searchBackground,
        },
        searchBarStyle
      ]}>
        {showSearchIcon && (
          <SearchIcon 
            size={ICON_SIZE} 
            color={themedColors.searchIcon} 
            style={[styles.searchIcon, { marginRight: ICON_MARGIN }]} 
          />
        )}
        
        <TextInput
          style={[
            styles.input,
            {
              height: SEARCH_HEIGHT,
              fontSize: INPUT_FONT_SIZE,
              color: themedColors.text,
            },
            searchInputStyle
          ]}
          value={inputValue}
          onChangeText={handleChange}
          placeholder={placeholderText}
          placeholderTextColor={themedColors.placeholder}
          returnKeyType="search"
          autoCapitalize="none"
          autoCorrect={false}
          accessibilityLabel="Search emojis"
          accessibilityRole="search"
        />
        
        {inputValue.length > 0 && (
          <TouchableOpacity 
            onPress={handleClear} 
            style={[styles.clearButton, { padding: CLEAR_BUTTON_PADDING }]}
            accessibilityRole="button"
            accessibilityLabel="Clear search"
            accessibilityHint="Double tap to clear the search field"
          >
            <XIcon size={CLEAR_ICON_SIZE} color={themedColors.clearIcon} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

export const EmojiSearch = EmojiSearchInner;

const styles = StyleSheet.create({
  container: {
    // All styling now via props and theme
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // All styling now via props and theme
  },
  searchIcon: {
    // All styling now via props and theme
  },
  input: {
    flex: 1,
    // All styling now via props and theme
    ...Platform.select({
      web: {
        outlineStyle: 'none',
      },
    }),
  },
  clearButton: {
    // All styling now via props and theme
  },
});

export default EmojiSearch;