import React from 'react';
import { StyleSheet, Text, View, Platform, LayoutChangeEvent } from 'react-native';
import { EmojiData } from '../../types/emoji';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

interface EmojiGridProps {
  emojis: EmojiData[];
  onEmojiSelect: (emoji: string) => void;
}

const AnimatedView = Animated.createAnimatedComponent(View);
const EMOJI_SIZE = '16.666%';

export function EmojiGrid({ emojis, onEmojiSelect }: EmojiGridProps) {
  const createTapGesture = (emoji: string) => {
    return Gesture.Tap()
      .onStart(() => {
        onEmojiSelect(emoji);
      });
  };

  return (
    <View style={styles.container}>
      {emojis.map((emoji, index) => {
        const gesture = createTapGesture(emoji.emoji);
        return (
          <GestureDetector 
            key={`${emoji.emoji}-${index}`} 
            gesture={gesture}
          >
            <AnimatedView
              style={[styles.emojiButton]}
              entering={FadeIn.delay(index * 5).withInitialValues({
                opacity: 0,
                transform: [{ scale: 0.9 }],
              })}
            >
              <Text style={styles.emoji}>{emoji.emoji}</Text>
              {emoji.skin_tones && (
                <View style={styles.skinToneIndicator} />
              )}
            </AnimatedView>
          </GestureDetector>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 4,
  },
  emojiButton: {
    width: EMOJI_SIZE,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    padding: 4,
  },
  emojiButtonPressed: {
    backgroundColor: '#f0f0f0',
  },
  emoji: {
    fontSize: 32,
  },
  skinToneIndicator: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#6366f1',
  },
});