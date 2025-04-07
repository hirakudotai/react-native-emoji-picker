/**
 * React Native Emoji Picker
 * A flexible emoji picker component for React Native
 * 
 * @package @hiraku-ai/react-native-emoji-picker
 * @author Stef Buzas - Hiraku
 * @license Apache-2.0
 */

export { default } from './components/EmojiPicker';
export { EmojiPickerContent } from './components/EmojiPicker';
export type { EmojiData } from './types/emoji';

// Export emoji data for easier access
export { default as emojiData } from './assets/data/emoji.json';

// Re-export icons for external use
export * from './assets/icons'; 