/**
 * Theme context for the emoji picker
 */

import React, { createContext, useContext, useMemo } from 'react';
import { EmojiPickerTheme, PartialTheme } from './types';
import { lightTheme, darkTheme } from './defaultThemes';

interface ThemeContextValue {
  theme: EmojiPickerTheme;
  isDarkMode: boolean;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface EmojiPickerThemeProviderProps {
  children: React.ReactNode;
  theme?: PartialTheme;
  darkMode?: boolean;
}

/**
 * Deep merge helper for theme objects
 */
function mergeTheme(base: EmojiPickerTheme, override?: PartialTheme): EmojiPickerTheme {
  if (!override) return base;
  
  return {
    colors: {
      ...base.colors,
      ...override.colors,
    },
    opacity: {
      ...base.opacity,
      ...override.opacity,
    },
  };
}

/**
 * Theme provider component
 */
export function EmojiPickerThemeProvider({
  children,
  theme: customTheme,
  darkMode = false,
}: EmojiPickerThemeProviderProps) {
  const theme = useMemo(() => {
    const baseTheme = darkMode ? darkTheme : lightTheme;
    return mergeTheme(baseTheme, customTheme);
  }, [darkMode, customTheme]);

  const value = useMemo(
    () => ({
      theme,
      isDarkMode: darkMode,
    }),
    [theme, darkMode]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Hook to access theme in components
 */
export function useEmojiPickerTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    // Return default light theme if no provider
    return {
      theme: lightTheme,
      isDarkMode: false,
    };
  }
  
  return context;
}
