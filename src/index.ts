/**
 * React Native Emoji Picker - Flexible emoji picker for React Native
 * @package @hiraku-ai/react-native-emoji-picker
 * @author Stef Buzas - Hiraku
 * @license Apache-2.0
 */

// Components
export { default as EmojiPickerModal } from './components/EmojiPicker';
export { EmojiPicker, SKIN_TONES, Category, SkinToneSelector } from './components/EmojiPicker';
export { default as EmojiSearch } from './components/EmojiPicker/EmojiSearch';
export { default as EmojiTabs } from './components/EmojiPicker/EmojiTabs';
export { default } from './components/EmojiPicker';

// Hooks
export { useEmojiPicker } from './hooks/useEmojiPicker';

// Types
export type { EmojiPickerProps, EmojiPickerModalProps, Section, FlatListItem } from './components/EmojiPicker';
export type { UseEmojiPickerProps } from './hooks/useEmojiPicker';
export type { EmojiData } from './types/emoji';
export type { EmojiPickerTheme, PartialTheme } from './theme';

// Data & Icons
export { default as emojiData } from './assets/data/emoji.json';
export * from './assets/icons';

// Theme
export { EmojiPickerThemeProvider, useEmojiPickerTheme, lightTheme, darkTheme } from './theme'; 