import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Platform } from 'react-native';
import { SearchIcon, XIcon } from '../../assets/icons';

interface EmojiSearchProps {
  value: string;
  onChangeText: (text: string) => void;
}

export function EmojiSearch({ value, onChangeText }: EmojiSearchProps) {
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

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <SearchIcon size={18} color="#9ca3af" style={styles.searchIcon} />
        
        <TextInput
          style={styles.input}
          value={localValue}
          onChangeText={handleChange}
          placeholder="Search emojis..."
          placeholderTextColor="#9ca3af"
          returnKeyType="search"
          autoCapitalize="none"
          autoCorrect={false}
        />
        
        {localValue.length > 0 && (
          <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
            <XIcon size={16} color="#9ca3af" />
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