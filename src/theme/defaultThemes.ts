/**
 * Default theme configurations
 */

import { EmojiPickerTheme } from './types';

export const lightTheme: EmojiPickerTheme = {
  colors: {
    // Backgrounds
    background: '#ffffff',
    backgroundSecondary: '#f9fafb',
    modalBackground: '#ffffff',
    headerBackground: 'transparent',
    searchBackground: '#f1f5f9',
    tabBackground: 'transparent',
    tabActiveBackground: '#f0f0f5',
    emojiButtonBackground: 'transparent',
    skinToneButtonBorder: 'rgba(0, 0, 0, 0.1)',
    
    // Text colors
    text: '#1f2937',
    textSecondary: '#6b7280',
    textTertiary: '#9ca3af',
    headerTitle: '#333333',
    categoryTitle: '#666666',
    placeholder: '#9ca3af',
    noResults: '#666666',
    
    // Borders
    border: '#e5e7eb',
    borderLight: '#f0f0f0',
    headerBorder: 'transparent',
    tabsBorder: '#eeeeee',
    categoryDivider: '#f0f0f0',
    
    // Interactive
    accent: '#007AFF',
    accentSecondary: '#0A84FF',
    
    // Icons
    icon: '#9ca3af',
    iconActive: '#6b7280',
    closeIcon: '#666666',
    
    // Overlay
    modalOverlay: 'rgba(0, 0, 0, 0.5)',
  },
  opacity: {
    modalOverlay: 1,
  },
};

export const darkTheme: EmojiPickerTheme = {
  colors: {
    // Backgrounds
    background: '#1a1a1a',
    backgroundSecondary: '#2a2a2a',
    modalBackground: '#1a1a1a',
    headerBackground: 'transparent',
    searchBackground: '#333333',
    tabBackground: 'rgba(255, 255, 255, 0.05)',
    tabActiveBackground: '#333333',
    emojiButtonBackground: 'transparent',
    skinToneButtonBorder: 'rgba(255, 255, 255, 0.2)',
    
    // Text colors
    text: '#f5f5f5',
    textSecondary: '#aaaaaa',
    textTertiary: '#888888',
    headerTitle: '#f5f5f5',
    categoryTitle: '#aaaaaa',
    placeholder: '#888888',
    noResults: '#aaaaaa',
    
    // Borders
    border: '#404040',
    borderLight: '#333333',
    headerBorder: '#333333',
    tabsBorder: '#333333',
    categoryDivider: '#333333',
    
    // Interactive
    accent: '#0A84FF',
    accentSecondary: '#007AFF',
    
    // Icons
    icon: '#888888',
    iconActive: '#aaaaaa',
    closeIcon: '#aaaaaa',
    
    // Overlay
    modalOverlay: 'rgba(0, 0, 0, 0.7)',
  },
  opacity: {
    modalOverlay: 1,
  },
};
