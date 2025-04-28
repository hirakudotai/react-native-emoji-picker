# React Native Emoji Picker

<div align="center">
  <img src="https://img.shields.io/npm/v/@hiraku-ai/react-native-emoji-picker?style=flat-square" alt="npm version" />
  <img src="https://img.shields.io/npm/l/@hiraku-ai/react-native-emoji-picker?style=flat-square" alt="license" />
  <img src="https://img.shields.io/npm/dt/@hiraku-ai/react-native-emoji-picker?style=flat-square" alt="downloads" />
</div>

<p align="center">
  <img src="https://hiraku.ai/content/images/2025/04/hiraku-react-native-emoji-picker.png" alt="React Native Emoji Picker - Hiraku" width="600" />
</p>

A flexible emoji picker component for React Native with both modal and inline options. Designed to work seamlessly across all React Native platforms (iOS, Android, and Web).

## Features

- 🚀 **Two integration options**: Use as a modal or embed directly in your UI
- 🔍 **Powerful search**: Find emojis quickly with intelligent search
- 🗂️ **Category navigation**: Browse emojis by intuitive categories
- 🕒 **Recently used**: Tracks and displays your most frequently used emojis
- 📱 **Cross-platform**: Works on iOS, Android, and Web
- 🏎️ **High performance**: Optimized rendering for smooth scrolling
- 🧩 **Peer dependencies**: Minimal footprint

## Installation

```bash
# npm
npm install @hiraku-ai/react-native-emoji-picker

# yarn
yarn add @hiraku-ai/react-native-emoji-picker

# pnpm
pnpm add @hiraku-ai/react-native-emoji-picker
```

### Peer Dependencies

This component requires the following peer dependencies:

```bash
npm install react-native-gesture-handler @react-native-async-storage/async-storage react-native-reanimated react-native-svg
```

## Usage

### Modal Version

```jsx
import React, { useState } from 'react';
import { View, Button } from 'react-native';
import EmojiPicker, { emojiData } from '@hiraku-ai/react-native-emoji-picker';

// In your component
function MyComponent() {
  const [selectedEmoji, setSelectedEmoji] = useState('');
  const [isEmojiPickerVisible, setEmojiPickerVisible] = useState(false);

  return (
    <View>
      <Button title="Open Emoji Picker" onPress={() => setEmojiPickerVisible(true)} />
      <EmojiPicker
        onEmojiSelect={(emoji) => {
          setSelectedEmoji(emoji);
          setEmojiPickerVisible(false);
        }}
        emojis={emojiData}
        visible={isEmojiPickerVisible}
        onClose={() => setEmojiPickerVisible(false)}
        showHistoryTab={true}
        showSearchBar={true}
      />
    </View>
  );
}
```

### Content-only Version

```jsx
import React from 'react';
import { View } from 'react-native';
import { EmojiPickerContent, emojiData } from '@hiraku-ai/react-native-emoji-picker';

// In your component
function InlineEmojiPicker() {
  return (
    <View style={{ height: 400 }}>
      <EmojiPickerContent 
        emojis={emojiData} 
        onEmojiSelect={(emoji) => console.log(emoji)}
        onClose={() => {}} // Not used for inline mode, but required by type
      />
    </View>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `emojis` | `EmojiData[]` | Required | Array of emoji data objects to display |
| `onEmojiSelect` | `(emoji: string) => void` | Required | Callback when an emoji is selected |
| `onClose` | `() => void` | Required | Callback when the modal is closed (not used for inline version) |
| `visible` | `boolean` | Required | Controls visibility of the modal (modal version only) |
| `showHistoryTab` | `boolean` | `true` | Enable/disable the recently used emojis feature |
| `showSearchBar` | `boolean` | `true` | Enable/disable the emoji search functionality |
| `showTabs` | `boolean` | `true` | Enable/disable the category tabs navigation |
| `tabIconColors` | `Record<string, string>` | See description | Customize colors for category tab icons. Example: `{'Recently Used': '#ff0000'}` |
| `searchContainerStyle` | `ViewStyle` | `undefined` | Custom styles for the search box container |
| `searchInputStyle` | `TextStyle` | `undefined` | Custom styles for the search input text |
| `searchPlaceholder` | `string` | `"Search emojis..."` | Custom placeholder text for the search input |
| `searchPlaceholderColor` | `string` | `"#9ca3af"` | Custom color for the search placeholder text |
| `searchIconColor` | `string` | `"#9ca3af"` | Custom color for the search icon |
| `clearIconColor` | `string` | `"#9ca3af"` | Custom color for the clear (X) icon |
| `activeTabStyle` | `ViewStyle` | `undefined` | Custom styles for the active category tab |
| `tabStyle` | `ViewStyle` | `undefined` | Custom styles for all category tabs |
| `modalTitle` | `string` | `"Pick an emoji"` | Custom title for the modal header |
| `modalTitleStyle` | `TextStyle` | `undefined` | Custom styles for the modal title text |
| `modalStyle` | `ViewStyle` | `undefined` | Custom styles for the modal container |
| `modalBackgroundColor` | `string` | `"#fff"` | Background color of the modal |
| `modalBorderRadius` | `number` | `16` | Border radius of the modal container |
| `modalHeaderStyle` | `ViewStyle` | `undefined` | Custom styles for the modal header |
| `modalCloseIconColor` | `string` | `"#666"` | Color of the close icon in the modal header |
| `modalCloseIconSize` | `number` | `24` | Size of the close (X) icon |
| `modalCloseIconStyle` | `ViewStyle` | `undefined` | Custom styles for the close icon container |
| `darkMode` | `boolean` | `false` | Enable dark theme for the picker |
| `categoryTitleStyle` | `TextStyle` | `undefined` | Custom styles for category titles |
| `categoryTitleAlign` | `'left' \| 'center' \| 'right'` | `'left'` | Alignment of category titles |

## Examples

### Custom Tab Icon Colors

```jsx
import React, { useState } from 'react';
import { View, Button } from 'react-native';
import EmojiPicker, { emojiData } from '@hiraku-ai/react-native-emoji-picker';

function CustomColoredEmojiPicker() {
  const [isVisible, setIsVisible] = useState(false);
  
  // Custom colors for category tabs
  const customColors = {
    'Recently Used': '#FF5733',
    'Smileys & Emotion': '#33FF57',
    'People & Body': '#3357FF',
    'Food & Drink': '#F033FF',
    'Travel & Places': '#FF3333'
  };
  
  return (
    <View>
      <Button title="Open Emoji Picker" onPress={() => setIsVisible(true)} />
      <EmojiPicker
        onEmojiSelect={(emoji) => {
          console.log(emoji);
          setIsVisible(false);
        }}
        emojis={emojiData}
        visible={isVisible}
        onClose={() => setIsVisible(false)}
        tabIconColors={customColors}
      />
    </View>
  );
}
```

### Customizing Visibility Options

```jsx
import React, { useState } from 'react';
import { View, Button } from 'react-native';
import EmojiPicker, { emojiData } from '@hiraku-ai/react-native-emoji-picker';

function MinimalistEmojiPicker() {
  const [isVisible, setIsVisible] = useState(false);
  
  return (
    <View>
      <Button title="Open Emoji Picker" onPress={() => setIsVisible(true)} />
      <EmojiPicker
        onEmojiSelect={(emoji) => {
          console.log(emoji);
          setIsVisible(false);
        }}
        emojis={emojiData}
        visible={isVisible}
        onClose={() => setIsVisible(false)}
        showHistoryTab={false} // Hide recently used emojis
        showSearchBar={false}  // Hide search bar
        showTabs={false}       // Hide category tabs
      />
    </View>
  );
}
```

### Customizing the Search Box

```jsx
import React, { useState } from 'react';
import { View, Button } from 'react-native';
import EmojiPicker, { emojiData } from '@hiraku-ai/react-native-emoji-picker';

function CustomSearchEmojiPicker() {
  const [isVisible, setIsVisible] = useState(false);
  
  return (
    <View>
      <Button title="Open Emoji Picker" onPress={() => setIsVisible(true)} />
      <EmojiPicker
        onEmojiSelect={(emoji) => {
          console.log(emoji);
          setIsVisible(false);
        }}
        emojis={emojiData}
        visible={isVisible}
        onClose={() => setIsVisible(false)}
        // Search box customization
        searchContainerStyle={{
          backgroundColor: '#f0f8ff',
          borderRadius: 20,
          borderWidth: 1,
          borderColor: '#4682b4',
        }}
        searchInputStyle={{
          color: '#333',
          fontSize: 18,
        }}
        searchPlaceholder="Find an emoji..."
        searchPlaceholderColor="#87ceeb"
        searchIconColor="#4682b4"
        clearIconColor="#4682b4"
      />
    </View>
  );
}
```

### Customizing the Category Tabs

```jsx
import React, { useState } from 'react';
import { View, Button } from 'react-native';
import EmojiPicker, { emojiData } from '@hiraku-ai/react-native-emoji-picker';

function CustomTabsEmojiPicker() {
  const [isVisible, setIsVisible] = useState(false);
  
  // Custom colors for category tabs
  const customColors = {
    'Recently Used': '#FF5733',
    'Smileys & Emotion': '#33FF57',
    'People & Body': '#3357FF',
  };
  
  return (
    <View>
      <Button title="Open Emoji Picker" onPress={() => setIsVisible(true)} />
      <EmojiPicker
        onEmojiSelect={(emoji) => {
          console.log(emoji);
          setIsVisible(false);
        }}
        emojis={emojiData}
        visible={isVisible}
        onClose={() => setIsVisible(false)}
        // Tab icon colors
        tabIconColors={customColors}
        // Tab styling
        tabStyle={{
          borderWidth: 1,
          borderColor: '#e5e7eb',
          borderRadius: 12,
        }}
        activeTabStyle={{
          backgroundColor: '#e0f2fe',
          borderColor: '#60a5fa',
          borderWidth: 2,
        }}
      />
    </View>
  );
}
```

### Customizing the Modal Appearance

```jsx
import React, { useState } from 'react';
import { View, Button } from 'react-native';
import EmojiPicker, { emojiData } from '@hiraku-ai/react-native-emoji-picker';

function CustomModalEmojiPicker() {
  const [isVisible, setIsVisible] = useState(false);
  
  return (
    <View>
      <Button title="Open Emoji Picker" onPress={() => setIsVisible(true)} />
      <EmojiPicker
        onEmojiSelect={(emoji) => {
          console.log(emoji);
          setIsVisible(false);
        }}
        emojis={emojiData}
        visible={isVisible}
        onClose={() => setIsVisible(false)}
        
        // Modal customization
        modalTitle="Select Your Emoji"
        modalTitleStyle={{
          color: '#1e40af',
          fontSize: 20,
          fontWeight: 'bold',
        }}
        modalBackgroundColor="#f8fafc"
        modalBorderRadius={24}
        modalStyle={{
          borderWidth: 2,
          borderColor: '#3b82f6',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.3,
          shadowRadius: 10,
          elevation: 10,
        }}
        modalHeaderStyle={{
          borderBottomWidth: 1,
          borderBottomColor: '#cbd5e1',
          paddingBottom: 12,
        }}
        modalCloseIconColor="#3b82f6"
      />
    </View>
  );
}
```

### Using Dark Mode

```jsx
import React, { useState } from 'react';
import { View, Button, useColorScheme } from 'react-native';
import EmojiPicker, { emojiData } from '@hiraku-ai/react-native-emoji-picker';

function DarkModeEmojiPicker() {
  const [isVisible, setIsVisible] = useState(false);
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  
  return (
    <View style={{ backgroundColor: isDarkMode ? '#121212' : '#fff' }}>
      <Button 
        title="Open Emoji Picker" 
        onPress={() => setIsVisible(true)} 
        color={isDarkMode ? '#3b82f6' : '#2563eb'}
      />
      <EmojiPicker
        onEmojiSelect={(emoji) => {
          console.log(emoji);
          setIsVisible(false);
        }}
        emojis={emojiData}
        visible={isVisible}
        onClose={() => setIsVisible(false)}
        darkMode={isDarkMode}
        // You can still customize even in dark mode
        modalTitle="Choose an Emoji"
        modalTitleStyle={{
          fontWeight: 'bold',
        }}
      />
    </View>
  );
}
```

### Customizing Category Titles

```jsx
import React, { useState } from 'react';
import { View, Button } from 'react-native';
import EmojiPicker, { emojiData } from '@hiraku-ai/react-native-emoji-picker';

function CustomCategoryTitlesEmojiPicker() {
  const [isVisible, setIsVisible] = useState(false);
  
  return (
    <View>
      <Button title="Open Emoji Picker" onPress={() => setIsVisible(true)} />
      <EmojiPicker
        onEmojiSelect={(emoji) => {
          console.log(emoji);
          setIsVisible(false);
        }}
        emojis={emojiData}
        visible={isVisible}
        onClose={() => setIsVisible(false)}
        // Category title customization
        categoryTitleStyle={{
          fontSize: 18,
          fontWeight: 'bold',
          color: '#3b82f6',
          textTransform: 'uppercase',
          letterSpacing: 1,
          paddingBottom: 10,
        }}
        categoryTitleAlign="center"
      />
    </View>
  );
}
```

### Customizing Close Icon

```jsx
import React, { useState } from 'react';
import { View, Button } from 'react-native';
import EmojiPicker, { emojiData } from '@hiraku-ai/react-native-emoji-picker';

function CustomCloseIconEmojiPicker() {
  const [isVisible, setIsVisible] = useState(false);
  
  return (
    <View>
      <Button title="Open Emoji Picker" onPress={() => setIsVisible(true)} />
      <EmojiPicker
        onEmojiSelect={(emoji) => {
          console.log(emoji);
          setIsVisible(false);
        }}
        emojis={emojiData}
        visible={isVisible}
        onClose={() => setIsVisible(false)}
        // Close icon customization
        modalCloseIconColor="#e11d48"
        modalCloseIconSize={32}
        modalCloseIconStyle={{
          backgroundColor: 'rgba(225, 29, 72, 0.1)',
          padding: 8,
          borderRadius: 20,
          marginLeft: 10,
        }}
      />
    </View>
  );
}
```

## License

[Apache License 2.0](LICENSE)

## Author

- **Stef Buzas** - [stefbuzas.com](https://stefbuzas.com)
- **Hiraku** - [hiraku.ai](https://hiraku.ai)

## Links

- **GitHub**: [https://github.com/hirakudotai/react-native-emoji-picker](https://github.com/hirakudotai/react-native-emoji-picker)
- **Issues**: [https://github.com/hirakudotai/react-native-emoji-picker/issues](https://github.com/hirakudotai/react-native-emoji-picker/issues)
- **Website**: [https://hiraku.ai](https://hiraku.ai)

## Acknowledgements

- [emoji-db](https://github.com/github/gemoji) - Emoji database from GitHub (MIT License)
- [Tabler Icons](https://tabler-icons.io/) - Icon set used for the UI components (MIT License)
- [React Native Gesture Handler](https://github.com/software-mansion/react-native-gesture-handler) - Gesture system used for interactions (MIT License)
- [React Native Reanimated](https://github.com/software-mansion/react-native-reanimated) - Animation library for smooth UI experiences (MIT License)
- [@react-native-async-storage/async-storage](https://github.com/react-native-async-storage/async-storage) - Data persistence for recently used emojis (MIT License)
- [React Native SVG](https://github.com/software-mansion/react-native-svg) - SVG support for React Native (MIT License)
- Special thanks to the React Native community 
