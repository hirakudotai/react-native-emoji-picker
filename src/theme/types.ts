/**
 * Theme types for the emoji picker
 */

export interface EmojiPickerTheme {
  colors: {
    // Backgrounds
    background: string;
    backgroundSecondary: string;
    modalBackground: string;
    headerBackground: string;
    searchBackground: string;
    tabBackground: string;
    tabActiveBackground: string;
    emojiButtonBackground: string;
    skinToneButtonBorder: string;
    
    // Text colors
    text: string;
    textSecondary: string;
    textTertiary: string;
    headerTitle: string;
    categoryTitle: string;
    placeholder: string;
    noResults: string;
    
    // Borders
    border: string;
    borderLight: string;
    headerBorder: string;
    tabsBorder: string;
    categoryDivider: string;
    
    // Interactive
    accent: string;
    accentSecondary: string;
    
    // Icons
    icon: string;
    iconActive: string;
    closeIcon: string;
    
    // Overlay
    modalOverlay: string;
  };
  opacity: {
    modalOverlay: number;
  };
}

export type PartialTheme = {
  colors?: Partial<EmojiPickerTheme['colors']>;
  opacity?: Partial<EmojiPickerTheme['opacity']>;
};
