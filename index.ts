/**
 * React Native Emoji Picker
 * A flexible emoji picker component for React Native
 * 
 * @package @hiraku-ai/react-native-emoji-picker
 * @author Stef Buzas - Hiraku
 * @license Apache-2.0
 */

import { ViewStyle, TextStyle } from 'react-native';
import EmojiPickerModal, { EmojiPicker } from './src/components/EmojiPicker';
import { EmojiData } from './src/types/emoji';
import emojiData from './src/assets/data/emoji.json';

export type { EmojiData, ViewStyle, TextStyle };
export { EmojiPickerModal, EmojiPicker, emojiData };
export * from './src/assets/icons';

export default EmojiPickerModal; 