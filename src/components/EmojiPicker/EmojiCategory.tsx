import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { EmojiData } from '../../types/emoji';
import { EmojiGrid } from './EmojiGrid';

interface EmojiCategoryProps {
  title: string;
  emojis: EmojiData[];
  onEmojiSelect: (emoji: string) => void;
}

export function EmojiCategory({ title, emojis, onEmojiSelect }: EmojiCategoryProps) {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.divider} />
      </View>
      <EmojiGrid emojis={emojis} onEmojiSelect={onEmojiSelect} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  titleContainer: {
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  }
});