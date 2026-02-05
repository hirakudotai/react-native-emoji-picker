# Changelog

All notable changes to this project will be documented in this file.

## [1.2.0] - 2026-02-05

### Added

**Theme System**
- Theme Context Provider (`EmojiPickerThemeProvider`) for consistent theming
- Comprehensive theme object with 26 customizable color properties
- Built-in `lightTheme` and `darkTheme` exports from package
- Partial theme overrides - only override colors you need
- Theme hook `useEmojiPickerTheme()` for accessing theme in custom components
- Full TypeScript support with `EmojiPickerTheme` and `PartialTheme` types

**Category & Emoji Filtering**
- `excludeCategories` prop to hide specific categories
- `includeCategories` prop to show only specific categories
- `categoryOrder` prop for custom tab ordering
- `excludeEmojis` prop to remove specific emojis by name
- `includeEmojis` prop to show only specific emojis by name
- `Category` enum export for type-safe category references
- All filters work seamlessly with search and recently used features

**Headless Mode**
- `useEmojiPicker` hook for building fully custom UIs
- Access to all picker logic (search, filtering, recent emojis, skin tones) without default UI
- 11 return values including state, setters, and processed data
- `emojiSections` and `flatListData` for easy rendering
- Support for filtering and category customization props

**Custom Rendering**
- `renderCustomTabs` prop for custom tab implementations
- `renderCustomSearch` prop for custom search bars
- `renderCustomSkinToneSelector` prop for custom skin tone pickers
- `renderCategoryHeader` prop for custom category headers
- Full access to theme context in custom renders

**Additional Features**
- `categoryNameMap` prop for renaming categories
- FlatList performance optimization props exported
- `SkinToneSelector` component exported standalone
- `EmojiSearch` and `EmojiTabs` components exported for custom layouts

### Migration & Upgrade Notes

⚠️ **Before upgrading to 1.2.0:**
- Test your implementation after upgrading
- Review theme-related styling if you use custom colors
- Check documentation for new features and props

**Recommendations:**
- Check `/documentation` folder for complete usage guides

## [1.1.0] - 2025-04-28
- Added dark mode support with toggle option.
- Added "Recently Used" tab with toggle option.
- Added customization for modal styling and close button.
- Added customization for search bar styling.
- Added customization for category tabs styling.
- Added customization for category tab icon colors.
- Added customization for category title styling and alignment.
- Added toggle option for showing/hiding the search bar.
- Added toggle option for showing/hiding the tabs section.
