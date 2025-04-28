import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Platform, ViewStyle, TextStyle } from 'react-native';
import { SearchIcon, XIcon } from '../../assets/icons';

interface EmojiSearchProps {
  value: string;
  onChangeText: (text: string) => void;
  // Style customization props
  searchContainerStyle?: ViewStyle;
  searchInputStyle?: TextStyle;
  placeholderText?: string;
  placeholderTextColor?: string;
  searchIconColor?: string;
  clearIconColor?: string;
  // Theme props
  darkMode?: boolean;
}

export function EmojiSearch({ 
  value, 
  onChangeText,
  searchContainerStyle,
  searchInputStyle,
  placeholderText = "Search emojis...",
  placeholderTextColor = "#9ca3af",
  searchIconColor = "#9ca3af",
  clearIconColor = "#9ca3af",
  darkMode = false
}: EmojiSearchProps) {
  const [localValue, setLocalValue] = useState(value);
  
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = useCallback((text: string) => {
    setLocalValue(text);
    onChangeText(text);
  }, [onChangeText]);

  const handleClear = useCallback(() => {
    setLocalValue('');
    onChangeText('');
  }, [onChangeText]);

  // Apply dark mode styles if enabled
  const containerStyle = [
    styles.container,
    darkMode && { backgroundColor: '#1a1a1a' }
  ];

  const searchContainerDefaultStyle = [
    styles.searchContainer,
    darkMode && { backgroundColor: '#333' }
  ];

  const inputDefaultStyle = [
    styles.input,
    darkMode && { color: '#f5f5f5' }
  ];

  return (
    <View style={containerStyle}>
      <View style={[searchContainerDefaultStyle, searchContainerStyle]}>
        <SearchIcon size={18} color={searchIconColor} style={styles.searchIcon} />
        
        <TextInput
          style={[inputDefaultStyle, searchInputStyle]}
          value={localValue}
          onChangeText={handleChange}
          placeholder={placeholderText}
          placeholderTextColor={placeholderTextColor}
          returnKeyType="search"
          autoCapitalize="none"
          autoCorrect={false}
        />
        
        {localValue.length > 0 && (
          <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
            <XIcon size={16} color={clearIconColor} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#1f2937',
    ...Platform.select({
      web: {
        outlineStyle: 'none',
      },
    }),
  },
  clearButton: {
    padding: 4,
  },
});

export default EmojiSearch;