# Headless Mode Guide

Build completely custom emoji picker UIs with total control over layout and styling.

## What is Headless Mode?

Headless mode gives you all the **logic** (search, filtering, recent emojis, skin tones) without any **UI**. You get the data and functions needed to build any custom interface you want.

Think of it as: **"Give me the brain, I'll build the body"**

---

## The useEmojiPicker Hook

Import and use the hook:

```jsx
import { useEmojiPicker, emojiData } from '@hiraku-ai/react-native-emoji-picker';

function CustomPicker() {
  const pickerState = useEmojiPicker({
    emojis: emojiData,
  });
  
  // Build your UI with pickerState
}
```

### Hook Configuration

```typescript
useEmojiPicker({
  emojis: EmojiData[];           // Required: emoji dataset
  showHistoryTab?: boolean;      // Default: true
  maxRecentEmojis?: number;      // Default: 6
  defaultSkinTone?: string;      // Default: ''
  columns?: number;              // Default: 6 (for flatListData)
})
```

### Return Values

The hook returns an object with 11 properties:

```typescript
{
  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  // Categories
  activeCategory: string | null;
  setActiveCategory: (category: string) => void;
  
  // Recent emojis
  recentEmojis: EmojiData[];
  
  // Skin tones
  selectedSkinTone: string;
  setSelectedSkinTone: (tone: string) => void;
  
  // Organized emoji data
  emojiSections: Array<{ title: string; data: EmojiData[] }>;
  flatListData: Array<FlatListItem>;
  
  // Utilities
  updateRecentEmojis: (emoji: string) => void;
  getModifiedEmoji: (emoji: string) => string;
}
```

---

## Data Structures

### emojiSections

Organized emoji data by category:

```javascript
[
  {
    title: 'Recently Used',
    data: [
      { emoji: '😀', description: 'grinning face', category: 'Smileys & Emotion', ... },
      { emoji: '❤️', description: 'red heart', category: 'Smileys & Emotion', ... }
    ]
  },
  {
    title: 'Smileys & Emotion',
    data: [/* all smileys */]
  },
  // ... more categories
]
```

**Use this for:** Custom layouts, horizontal scrolling, carousels, completely custom UI

### flatListData

Pre-processed data for vertical grid rendering:

```javascript
[
  { type: 'header', category: 'Smileys & Emotion', id: 'header-0' },
  { type: 'emojiRow', emojis: [emoji1, emoji2, emoji3, emoji4, emoji5, emoji6], id: 'row-0-0' },
  { type: 'emojiRow', emojis: [emoji7, emoji8, emoji9, ...], id: 'row-0-6' },
  // ... more rows
]
```

**Use this for:** Quick vertical grid implementation

### EmojiData Structure

```typescript
{
  emoji: string;              // The emoji character
  description: string;        // 'grinning face'
  category: string;           // 'Smileys & Emotion'
  aliases: string[];          // ['grinning', 'smile']
  tags: string[];             // ['happy', 'joy']
  unicode_version: string;    // '1.0'
  ios_version: string;        // '6.0'
  skin_tones?: boolean;       // true if supports skin tones
}
```

---

## Complete Examples

### Minimal Horizontal Picker

```jsx
import { useEmojiPicker, emojiData } from '@hiraku-ai/react-native-emoji-picker';
import { ScrollView, TouchableOpacity, Text } from 'react-native';

function HorizontalPicker({ onSelect }) {
  const { emojiSections, updateRecentEmojis } = useEmojiPicker({
    emojis: emojiData,
  });
  
  const handlePress = (emoji) => {
    updateRecentEmojis(emoji);
    onSelect(emoji);
  };
  
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {emojiSections.map((section) =>
        section.data.slice(0, 10).map((item) => (
          <TouchableOpacity
            key={item.emoji}
            onPress={() => handlePress(item.emoji)}
            style={{ padding: 10 }}
          >
            <Text style={{ fontSize: 24 }}>{item.emoji}</Text>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
}
```

### Searchable Custom Picker

```jsx
import { useEmojiPicker, emojiData, EmojiSearch } from '@hiraku-ai/react-native-emoji-picker';

function SearchablePicker() {
  const {
    searchQuery,
    setSearchQuery,
    emojiSections,
    updateRecentEmojis,
  } = useEmojiPicker({ emojis: emojiData });
  
  return (
    <View>
      <EmojiSearch
        onSearch={setSearchQuery}
        debounceMs={150}
      />
      
      <ScrollView>
        {emojiSections.map((section) => (
          <View key={section.title}>
            <Text style={{ fontWeight: 'bold', padding: 10 }}>
              {section.title}
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {section.data.map((emoji) => (
                <TouchableOpacity
                  key={emoji.emoji}
                  onPress={() => {
                    updateRecentEmojis(emoji.emoji);
                    console.log(emoji.emoji);
                  }}
                  style={{ padding: 8 }}
                >
                  <Text style={{ fontSize: 28 }}>{emoji.emoji}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
```

### Carousel-Style Picker

```jsx
import { useEmojiPicker, emojiData, EmojiTabs } from '@hiraku-ai/react-native-emoji-picker';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';

function CarouselPicker() {
  const {
    activeCategory,
    setActiveCategory,
    emojiSections,
    updateRecentEmojis,
  } = useEmojiPicker({ emojis: emojiData });
  
  const categories = emojiSections.map(s => s.title);
  const activeSection = emojiSections.find(s => s.title === activeCategory);
  
  return (
    <View style={{ height: 300 }}>
      <EmojiTabs
        categories={categories}
        activeCategory={activeCategory}
        onCategoryPress={setActiveCategory}
      />
      
      <FlatList
        data={activeSection?.data || []}
        keyExtractor={(item) => item.emoji}
        numColumns={6}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              updateRecentEmojis(item.emoji);
              console.log(item.emoji);
            }}
            style={{ padding: 10 }}
          >
            <Text style={{ fontSize: 24 }}>{item.emoji}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
```

### With Skin Tone Support

```jsx
import { 
  useEmojiPicker, 
  emojiData, 
  SkinToneSelector,
  SKIN_TONES 
} from '@hiraku-ai/react-native-emoji-picker';

function PickerWithSkinTones() {
  const {
    emojiSections,
    selectedSkinTone,
    setSelectedSkinTone,
    getModifiedEmoji,
    updateRecentEmojis,
  } = useEmojiPicker({
    emojis: emojiData,
    defaultSkinTone: '',
  });
  
  const handleEmojiPress = (emoji) => {
    const modifiedEmoji = getModifiedEmoji(emoji);
    updateRecentEmojis(modifiedEmoji);
    console.log(modifiedEmoji);
  };
  
  return (
    <View>
      <SkinToneSelector
        selectedSkinTone={selectedSkinTone}
        onSkinToneChange={setSelectedSkinTone}
      />
      
      <ScrollView>
        {emojiSections.map((section) => (
          <View key={section.title}>
            {section.data.map((emoji) => (
              <TouchableOpacity
                key={emoji.emoji}
                onPress={() => handleEmojiPress(emoji.emoji)}
              >
                <Text style={{ fontSize: 28 }}>
                  {getModifiedEmoji(emoji.emoji)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
```

### Grid with FlatList (Performance Optimized)

```jsx
function OptimizedGrid() {
  const {
    flatListData,
    updateRecentEmojis,
    getModifiedEmoji,
  } = useEmojiPicker({
    emojis: emojiData,
    columns: 8,
  });
  
  const renderItem = ({ item }) => {
    if (item.type === 'header') {
      return (
        <View style={{ padding: 10 }}>
          <Text style={{ fontWeight: 'bold' }}>{item.category}</Text>
        </View>
      );
    }
    
    return (
      <View style={{ flexDirection: 'row' }}>
        {item.emojis.map((emoji) => (
          <TouchableOpacity
            key={emoji.emoji}
            onPress={() => {
              const modified = getModifiedEmoji(emoji.emoji);
              updateRecentEmojis(modified);
              console.log(modified);
            }}
            style={{ flex: 1, padding: 8, alignItems: 'center' }}
          >
            <Text style={{ fontSize: 24 }}>{emoji.emoji}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  
  return (
    <FlatList
      data={flatListData}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={5}
    />
  );
}
```

---

## Combining with Standalone Components

You can mix the headless hook with standalone components:

```jsx
import {
  useEmojiPicker,
  emojiData,
  EmojiSearch,
  EmojiTabs,
  SkinToneSelector,
} from '@hiraku-ai/react-native-emoji-picker';

function FullCustomPicker() {
  const {
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    selectedSkinTone,
    setSelectedSkinTone,
    emojiSections,
    updateRecentEmojis,
    getModifiedEmoji,
  } = useEmojiPicker({ emojis: emojiData });
  
  const categories = emojiSections.map(s => s.title);
  
  return (
    <View>
      {/* Use standalone search */}
      <EmojiSearch onSearch={setSearchQuery} />
      
      {/* Use standalone tabs */}
      <EmojiTabs
        categories={categories}
        activeCategory={activeCategory}
        onCategoryPress={setActiveCategory}
      />
      
      {/* Use standalone skin tone selector */}
      <SkinToneSelector
        selectedSkinTone={selectedSkinTone}
        onSkinToneChange={setSelectedSkinTone}
      />
      
      {/* Your custom emoji grid */}
      <YourCustomGrid
        sections={emojiSections}
        onSelect={(emoji) => {
          const modified = getModifiedEmoji(emoji);
          updateRecentEmojis(modified);
        }}
      />
    </View>
  );
}
```

---

## What You CAN'T Customize

The hook provides its own internal logic for:

- **Storage**: Uses AsyncStorage with key `'emoji_picker_recent_emojis'`
- **Search algorithm**: Fixed substring matching on description, aliases, tags, and emoji
- **Grouping logic**: Fixed category organization
- **Skin tone application**: Fixed modifier application

If you need to customize these, you'll need to implement your own logic.

---

## TypeScript Support

```typescript
import { 
  useEmojiPicker, 
  UseEmojiPickerProps,
  EmojiData 
} from '@hiraku-ai/react-native-emoji-picker';

function TypeSafePicker() {
  const config: UseEmojiPickerProps = {
    emojis: emojiData,
    showHistoryTab: true,
    maxRecentEmojis: 30,
  };
  
  const {
    emojiSections,
    updateRecentEmojis,
  } = useEmojiPicker(config);
  
  // Full type safety
}
```
