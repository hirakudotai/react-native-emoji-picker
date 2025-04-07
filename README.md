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
