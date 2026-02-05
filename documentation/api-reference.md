# API Reference

Complete reference for all components and their props.

## EmojiPickerModal

The modal version with overlay background.

```jsx
import EmojiPickerModal, { emojiData } from '@hiraku-ai/react-native-emoji-picker';

<EmojiPickerModal
  visible={true}
  onClose={() => {}}
  onEmojiSelect={(emoji) => console.log(emoji)}
  emojis={emojiData}
/>
```

### Required Props

| Prop | Type | Description |
|------|------|-------------|
| `visible` | `boolean` | Controls modal visibility |
| `onClose` | `() => void` | Called when modal should close |
| `onEmojiSelect` | `(emoji: string) => void` | Called when emoji is selected |
| `emojis` | `EmojiData[]` | Array of emoji data (use `emojiData` export) |

### Modal-Specific Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modalTitle` | `string` | `"Pick an emoji"` | Title text in modal header |
| `modalStyle` | `ViewStyle` | - | Style for modal container |
| `modalHeaderStyle` | `ViewStyle` | - | Style for header container |
| `modalTitleStyle` | `TextStyle` | - | Custom style for title text |
| `modalCloseButtonStyle` | `ViewStyle` | - | Style for close button |
| `modalWidthPercentage` | `number` | `0.9` | Modal width as percentage (0-1) |
| `modalHeightPercentage` | `number` | `0.7` | Modal height as percentage (0-1) |
| `modalMaxWidth` | `number` | `450` | Maximum modal width in pixels |
| `modalMaxHeight` | `number` | `600` | Maximum modal height in pixels |

### Animation

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `animationType` | `'none' \| 'slide' \| 'fade'` | `'fade'` | Modal animation type |

---

## EmojiPicker

The inline embeddable version (inherits all EmojiPickerModal props except modal-specific ones).

```jsx
import { EmojiPicker, emojiData } from '@hiraku-ai/react-native-emoji-picker';

<View style={{ height: 400 }}>
  <EmojiPicker
    emojis={emojiData}
    onEmojiSelect={(emoji) => console.log(emoji)}
  />
</View>
```

### Required Props

| Prop | Type | Description |
|------|------|-------------|
| `onEmojiSelect` | `(emoji: string) => void` | Called when emoji is selected |
| `emojis` | `EmojiData[]` | Array of emoji data |

### Feature Toggles

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showHistoryTab` | `boolean` | `true` | Show recently used emojis tab |
| `showSearchBar` | `boolean` | `true` | Show search input |
| `showTabs` | `boolean` | `true` | Show category tabs |
| `showSkinToneSelector` | `boolean` | `false` | Show skin tone picker |
| `showSearchIcon` | `boolean` | `true` | Show search icon in search bar |

### Category Filtering & Ordering

| Prop | Type | Description |
|------|------|-------------|
| `excludeCategories` | `string[]` | Categories to hide |
| `includeCategories` | `string[]` | Only show these categories |
| `categoryOrder` | `string[]` | Custom category order |
| `categoryNameMap` | `Record<string, string>` | Rename category display names |

### Emoji Filtering

| Prop | Type | Description |
|------|------|-------------|
| `excludeEmojis` | `string[]` | Specific emojis to hide |
| `includeEmojis` | `string[]` | Only show these emojis |

### Layout

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `number` | `6` | Number of emoji columns |

### Behavior

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `maxRecentEmojis` | `number` | `20` | Max recent emojis to track |
| `defaultSkinTone` | `string` | `''` | Default skin tone modifier |
| `searchDebounceMs` | `number` | `150` | Search debounce delay (ms) |
| `searchMinChars` | `number` | `2` | Min chars to trigger search |

### Style Props

| Prop | Type | Description |
|------|------|-------------|
| `containerStyle` | `ViewStyle` | Style for main container |
| `searchBarStyle` | `ViewStyle` | Style for search bar container |
| `searchInputStyle` | `TextStyle` | Style for search input |
| `tabsContainerStyle` | `ViewStyle` | Style for tabs container |
| `tabStyle` | `ViewStyle` | Style for inactive tab buttons |
| `activeTabStyle` | `ViewStyle` | Style for active tab button |
| `categoryHeaderStyle` | `TextStyle` | Style for category titles |
| `categoryContainerStyle` | `ViewStyle` | Style for category sections |
| `emojiButtonStyle` | `ViewStyle` | Style for emoji buttons |
| `skinToneSelectorStyle` | `ViewStyle` | Style for skin tone selector |
| `skinToneButtonStyle` | `ViewStyle` | Style for skin tone buttons |
| `noResultsStyle` | `TextStyle` | Style for no results text |

### Custom Text

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `searchPlaceholder` | `string` | `"Search emojis..."` | Search placeholder text |
| `tabIconColors` | `Record<string, string>` | - | Custom colors per category icon |

### Theme

| Prop | Type | Description |
|------|------|-------------|
| `darkMode` | `boolean` | Enable dark mode |
| `theme` | `PartialTheme` | Custom theme colors |

### Custom Render Functions

| Prop | Type | Description |
|------|------|-------------|
| `renderCustomTabs` | `(props) => ReactNode` | Replace tab navigation |
| `renderCustomSearch` | `(props) => ReactNode` | Replace search bar |
| `renderCustomSkinToneSelector` | `(props) => ReactNode` | Replace skin tone selector |
| `renderCategoryHeader` | `(props) => ReactNode` | Custom category headers |

### Performance (FlatList)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `initialNumToRender` | `number` | `30` | Initial items to render |
| `maxToRenderPerBatch` | `number` | `20` | Items per batch |
| `updateCellsBatchingPeriod` | `number` | `50` | Batch update delay (ms) |
| `windowSize` | `number` | `10` | Render window size |
| `removeClippedSubviews` | `boolean` | `true` | Remove offscreen views |

---

## EmojiSearch

Standalone search component.

```jsx
import { EmojiSearch } from '@hiraku-ai/react-native-emoji-picker';

<EmojiSearch
  onSearch={(text) => console.log(text)}
  debounceMs={150}
  minChars={2}
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onSearch` | `(text: string) => void` | **Required** | Called with search query |
| `debounceMs` | `number` | `150` | Debounce delay (ms) |
| `minChars` | `number` | `2` | Min characters to trigger search |
| `placeholderText` | `string` | `"Search emojis..."` | Placeholder text |
| `searchBarStyle` | `ViewStyle` | - | Style for search bar |
| `searchInputStyle` | `TextStyle` | - | Style for input |
| `showSearchIcon` | `boolean` | `true` | Show search icon |
| `containerStyle` | `ViewStyle` | - | Style for container |

---

## EmojiTabs

Standalone category tabs component.

```jsx
import { EmojiTabs } from '@hiraku-ai/react-native-emoji-picker';

<EmojiTabs
  categories={['Smileys & Emotion', 'People & Body']}
  activeCategory="Smileys & Emotion"
  onCategoryPress={(category) => console.log(category)}
/>
```

| Prop | Type | Description |
|------|------|-------------|
| `categories` | `string[]` | **Required** - Array of category names |
| `activeCategory` | `string \| null` | **Required** - Currently active category |
| `onCategoryPress` | `(category: string) => void` | **Required** - Called when tab pressed |
| `tabIconColors` | `Record<string, string>` | Custom colors per category |
| `tabsContainerStyle` | `ViewStyle` | Style for container |
| `tabStyle` | `ViewStyle` | Style for inactive tabs |
| `activeTabStyle` | `ViewStyle` | Style for active tab |

---

## SkinToneSelector

Standalone skin tone picker component.

```jsx
import { SkinToneSelector } from '@hiraku-ai/react-native-emoji-picker';

<SkinToneSelector
  selectedSkinTone=""
  onSkinToneChange={(tone) => console.log(tone)}
/>
```

| Prop | Type | Description |
|------|------|-------------|
| `selectedSkinTone` | `string` | **Required** - Current skin tone modifier |
| `onSkinToneChange` | `(tone: string) => void` | **Required** - Called when tone changes |
| `skinToneSelectorStyle` | `ViewStyle` | Style for container |
| `skinToneButtonStyle` | `ViewStyle` | Style for buttons |
| `renderCustomSkinToneSelector` | `(props) => ReactNode` | Custom renderer |
