// Main entry point - re-exports all components and types
import React from 'react';
import { EmojiPickerModal } from './EmojiPickerModal';
import { EmojiPickerModalProps } from './types';

// Re-export types and constants
export { SKIN_TONES, Category } from './constants';
export type { 
  FlatListItem, 
  Section, 
  EmojiPickerProps,
  EmojiPickerModalProps
} from './types';

// Re-export components
export { EmojiPicker } from './EmojiPicker';
export { EmojiPickerModal } from './EmojiPickerModal';
export { SkinToneSelector } from './SkinToneSelector';
export { EmojiSearch } from './EmojiSearch';
export { EmojiTabs } from './EmojiTabs';

// Default export: Modal version (most common use case)
export default function (props: EmojiPickerModalProps) {
  return <EmojiPickerModal {...props} />;
}