# TypeScript Guide

Complete reference for types, interfaces, and type-safe implementations.

## Exported Types

### Component Props Types

```typescript
import type {
  EmojiPickerModalProps,
  EmojiPickerProps,
} from '@hiraku-ai/react-native-emoji-picker';

// Modal version props
const modalProps: EmojiPickerModalProps = {
  visible: true,
  onClose: () => {},
  onEmojiSelect: (emoji: string) => console.log(emoji),
  emojis: emojiData,
  // ... 100+ optional props
};

// Inline version props
const inlineProps: EmojiPickerProps = {
  onEmojiSelect: (emoji: string) => console.log(emoji),
  emojis: emojiData,
  onClose: () => {},
  // ... 100+ optional props
};
```

### EmojiData

The core emoji data structure:

```typescript
import type { EmojiData } from '@hiraku-ai/react-native-emoji-picker';

interface EmojiData {
  emoji: string;              // The emoji character '😀'
  description: string;        // Human-readable description
  category: string;           // Category name
  aliases: string[];          // Alternative names
  tags: string[];             // Related keywords
  unicode_version: string;    // Unicode version added
  ios_version: string;        // iOS version with support
  skin_tones?: boolean;       // Whether supports skin tones
}

// Example
const example: EmojiData = {
  emoji: '😀',
  description: 'grinning face',
  category: 'Smileys & Emotion',
  aliases: ['grinning'],
  tags: ['smile', 'happy'],
  unicode_version: '6.1',
  ios_version: '6.0',
  skin_tones: false,
};
```

### Theme Types

```typescript
import type {
  EmojiPickerTheme,
  PartialTheme,
} from '@hiraku-ai/react-native-emoji-picker';

// Full theme interface
interface EmojiPickerTheme {
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

// Partial theme for overrides
type PartialTheme = {
  colors?: Partial<EmojiPickerTheme['colors']>;
  opacity?: Partial<EmojiPickerTheme['opacity']>;
};

// Usage
const customTheme: PartialTheme = {
  colors: {
    accent: '#ff6b6b',
    background: '#ffffff',
  }
};
```

### Hook Types

```typescript
import type { UseEmojiPickerProps } from '@hiraku-ai/react-native-emoji-picker';

interface UseEmojiPickerProps {
  emojis: EmojiData[];
  showHistoryTab?: boolean;
  maxRecentEmojis?: number;
  defaultSkinTone?: string;
  columns?: number;
}

// Hook return type
interface UseEmojiPickerReturn {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeCategory: string | null;
  setActiveCategory: (category: string) => void;
  recentEmojis: EmojiData[];
  selectedSkinTone: string;
  setSelectedSkinTone: (tone: string) => void;
  emojiSections: Section[];
  flatListData: FlatListItem[];
  updateRecentEmojis: (emoji: string) => void;
  getModifiedEmoji: (emoji: string) => string;
}
```

### Section & FlatList Types

```typescript
import type { Section, FlatListItem } from '@hiraku-ai/react-native-emoji-picker';

interface Section {
  title: string;
  data: EmojiData[];
}

type FlatListItem = 
  | { type: 'header'; category: string; id: string }
  | { type: 'emojiRow'; emojis: EmojiData[]; id: string };
```

---

## Constants

### SKIN_TONES

```typescript
import { SKIN_TONES } from '@hiraku-ai/react-native-emoji-picker';

// Type
const SKIN_TONES: ReadonlyArray<{
  name: string;
  modifier: string;
  color: string;
}>;

// Value
[
  { name: 'Default', modifier: '', color: '#FFDE00' },
  { name: 'Light', modifier: '🏻', color: '#F7D7C4' },
  { name: 'Medium-Light', modifier: '🏼', color: '#D8B094' },
  { name: 'Medium', modifier: '🏽', color: '#BB9167' },
  { name: 'Medium-Dark', modifier: '🏾', color: '#8E562E' },
  { name: 'Dark', modifier: '🏿', color: '#613D30' },
]
```

### Category Enum

```typescript
import { Category } from '@hiraku-ai/react-native-emoji-picker';

enum Category {
  RECENTLY_USED = 'Recently Used',
  SMILEYS_EMOTION = 'Smileys & Emotion',
  PEOPLE_BODY = 'People & Body',
  ANIMALS_NATURE = 'Animals & Nature',
  FOOD_DRINK = 'Food & Drink',
  TRAVEL_PLACES = 'Travel & Places',
  ACTIVITIES = 'Activities',
  OBJECTS = 'Objects',
  SYMBOLS = 'Symbols',
  FLAGS = 'Flags',
}

// Usage
const category: Category = Category.SMILEYS_EMOTION;
```

---

## Type-Safe Component Usage

### Basic Modal

```typescript
import React, { useState } from 'react';
import EmojiPickerModal, { 
  emojiData,
  type EmojiPickerModalProps 
} from '@hiraku-ai/react-native-emoji-picker';

function TypeSafeModal() {
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedEmoji, setSelectedEmoji] = useState<string>('');
  
  const handleEmojiSelect = (emoji: string): void => {
    setSelectedEmoji(emoji);
    setVisible(false);
  };
  
  const modalProps: EmojiPickerModalProps = {
    visible,
    onClose: () => setVisible(false),
    onEmojiSelect: handleEmojiSelect,
    emojis: emojiData,
    modalTitle: 'Pick an Emoji',
    showHistoryTab: true,
  };
  
  return <EmojiPickerModal {...modalProps} />;
}
```

### Custom Render Props

```typescript
import type { EmojiPickerModalProps } from '@hiraku-ai/react-native-emoji-picker';
import { View, Text, TouchableOpacity } from 'react-native';

const customSearchRender: NonNullable<
  EmojiPickerModalProps['renderCustomSearch']
> = ({ onSearch, searchQuery }) => {
  return (
    <View>
      <TextInput
        value={searchQuery}
        onChangeText={onSearch}
        placeholder="Search..."
      />
    </View>
  );
};

const customTabsRender: NonNullable<
  EmojiPickerModalProps['renderCustomTabs']
> = ({ categories, activeCategory, onCategoryPress }) => {
  return (
    <View>
      {categories.map((category: string) => (
        <TouchableOpacity
          key={category}
          onPress={() => onCategoryPress(category)}
        >
          <Text>{category}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
```

### Type-Safe Hook Usage

```typescript
import { useEmojiPicker, emojiData } from '@hiraku-ai/react-native-emoji-picker';
import type { 
  UseEmojiPickerProps,
  EmojiData,
  Section 
} from '@hiraku-ai/react-native-emoji-picker';

function TypeSafeHeadless() {
  const config: UseEmojiPickerProps = {
    emojis: emojiData,
    showHistoryTab: true,
    maxRecentEmojis: 30,
    defaultSkinTone: '',
    columns: 8,
  };
  
  const {
    searchQuery,
    setSearchQuery,
    emojiSections,
    updateRecentEmojis,
    getModifiedEmoji,
  } = useEmojiPicker(config);
  
  const handleEmojiPress = (emoji: string): void => {
    const modified: string = getModifiedEmoji(emoji);
    updateRecentEmojis(modified);
  };
  
  return (
    <View>
      {emojiSections.map((section: Section) => (
        <View key={section.title}>
          <Text>{section.title}</Text>
          {section.data.map((emoji: EmojiData) => (
            <TouchableOpacity
              key={emoji.emoji}
              onPress={() => handleEmojiPress(emoji.emoji)}
            >
              <Text>{emoji.emoji}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
}
```

---

## Creating Custom Emoji Data

### Custom Emoji Dataset

```typescript
import type { EmojiData } from '@hiraku-ai/react-native-emoji-picker';

const customEmojis: EmojiData[] = [
  {
    emoji: '🎮',
    description: 'video game',
    category: 'Activities',
    aliases: ['game', 'gaming'],
    tags: ['controller', 'play'],
    unicode_version: '6.0',
    ios_version: '6.0',
    skin_tones: false,
  },
  {
    emoji: '🎨',
    description: 'artist palette',
    category: 'Activities',
    aliases: ['art', 'painting'],
    tags: ['creative', 'design'],
    unicode_version: '6.0',
    ios_version: '6.0',
    skin_tones: false,
  },
];

// Use with picker
<EmojiPickerModal
  visible={true}
  onClose={() => {}}
  onEmojiSelect={(emoji) => console.log(emoji)}
  emojis={customEmojis}
/>
```

### Filtering Emoji Data

```typescript
import { emojiData } from '@hiraku-ai/react-native-emoji-picker';
import type { EmojiData } from '@hiraku-ai/react-native-emoji-picker';

// Type-safe filtering
const smileyEmojis: EmojiData[] = emojiData.filter(
  (emoji: EmojiData) => emoji.category === 'Smileys & Emotion'
);

const recentVersion: EmojiData[] = emojiData.filter(
  (emoji: EmojiData) => parseFloat(emoji.unicode_version) >= 13.0
);

const withSkinTones: EmojiData[] = emojiData.filter(
  (emoji: EmojiData) => emoji.skin_tones === true
);
```

---

## Type Guards

### Checking FlatList Item Types

```typescript
import type { FlatListItem } from '@hiraku-ai/react-native-emoji-picker';

function isHeaderItem(item: FlatListItem): item is { type: 'header'; category: string; id: string } {
  return item.type === 'header';
}

function isEmojiRowItem(item: FlatListItem): item is { type: 'emojiRow'; emojis: EmojiData[]; id: string } {
  return item.type === 'emojiRow';
}

// Usage
const renderItem = ({ item }: { item: FlatListItem }) => {
  if (isHeaderItem(item)) {
    return <Text>{item.category}</Text>;
  }
  
  if (isEmojiRowItem(item)) {
    return (
      <View>
        {item.emojis.map(emoji => (
          <Text key={emoji.emoji}>{emoji.emoji}</Text>
        ))}
      </View>
    );
  }
  
  return null;
};
```

---

## Generic Components

### Creating Reusable Wrappers

```typescript
import React from 'react';
import EmojiPickerModal from '@hiraku-ai/react-native-emoji-picker';
import type { 
  EmojiPickerModalProps,
  PartialTheme 
} from '@hiraku-ai/react-native-emoji-picker';

interface BrandedPickerProps extends Omit<EmojiPickerModalProps, 'theme'> {
  variant?: 'primary' | 'secondary';
}

const brandThemes: Record<'primary' | 'secondary', PartialTheme> = {
  primary: {
    colors: {
      accent: '#007AFF',
      headerBackground: '#007AFF',
    }
  },
  secondary: {
    colors: {
      accent: '#34C759',
      headerBackground: '#34C759',
    }
  },
};

export function BrandedPicker({ variant = 'primary', ...props }: BrandedPickerProps) {
  return (
    <EmojiPickerModal
      {...props}
      theme={brandThemes[variant]}
    />
  );
}
```

---

## Utility Types

### Extract Specific Prop Groups

```typescript
import type { EmojiPickerModalProps } from '@hiraku-ai/react-native-emoji-picker';

// Extract only search-related props
type SearchProps = Pick<
  EmojiPickerModalProps,
  | 'searchPlaceholder'
  | 'searchDebounceMs'
  | 'searchMinChars'
  | 'searchBarStyle'
  | 'searchInputStyle'
  | 'showSearchIcon'
>;

// Extract only tab-related props
type TabProps = Pick<
  EmojiPickerModalProps,
  | 'showTabs'
  | 'tabIconColors'
  | 'activeTabStyle'
  | 'tabStyle'
  | 'tabsContainerStyle'
>;

// Extract filtering props
type FilterProps = Pick<
  EmojiPickerModalProps,
  | 'excludeCategories'
  | 'includeCategories'
  | 'categoryOrder'
  | 'excludeEmojis'
  | 'includeEmojis'
>;
```

---

## Full Example with Types

```typescript
import React, { useState, useCallback } from 'react';
import EmojiPickerModal, {
  emojiData,
  EmojiPickerThemeProvider,
  lightTheme,
  darkTheme,
} from '@hiraku-ai/react-native-emoji-picker';
import type {
  EmojiPickerModalProps,
  EmojiData,
  EmojiPickerTheme,
  PartialTheme,
} from '@hiraku-ai/react-native-emoji-picker';

interface AppState {
  visible: boolean;
  selectedEmoji: string | null;
  isDarkMode: boolean;
}

function TypeSafeApp() {
  const [state, setState] = useState<AppState>({
    visible: false,
    selectedEmoji: null,
    isDarkMode: false,
  });
  
  const handleEmojiSelect = useCallback((emoji: string): void => {
    setState(prev => ({
      ...prev,
      selectedEmoji: emoji,
      visible: false,
    }));
  }, []);
  
  const theme: EmojiPickerTheme = state.isDarkMode ? darkTheme : lightTheme;
  
  const themeOverride: PartialTheme = {
    colors: {
      accent: '#ff6b6b',
    }
  };
  
  const pickerProps: EmojiPickerModalProps = {
    visible: state.visible,
    onClose: () => setState(prev => ({ ...prev, visible: false })),
    onEmojiSelect: handleEmojiSelect,
    emojis: emojiData,
    theme: themeOverride,
    showHistoryTab: true,
    maxRecentEmojis: 30,
  };
  
  return (
    <EmojiPickerThemeProvider theme={theme}>
      <EmojiPickerModal {...pickerProps} />
    </EmojiPickerThemeProvider>
  );
}
```
