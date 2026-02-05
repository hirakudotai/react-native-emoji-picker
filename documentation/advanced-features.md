# Advanced Features

Power user features for complete customization and control.

## Custom Render Functions

Replace built-in components with your own implementations.

### renderCustomSearch

Replace the search bar with a custom component:

```jsx
<EmojiPickerModal
  visible={true}
  onClose={() => {}}
  onEmojiSelect={(emoji) => console.log(emoji)}
  emojis={emojiData}
  renderCustomSearch={({ onSearch, searchQuery }) => (
    <View style={{ padding: 20, backgroundColor: '#f0f0f0' }}>
      <TextInput
        value={searchQuery}
        onChangeText={onSearch}
        placeholder="Find your emoji..."
        style={{
          padding: 12,
          borderRadius: 8,
          backgroundColor: '#ffffff',
          fontSize: 16,
        }}
      />
    </View>
  )}
/>
```

**Props provided:**
- `onSearch: (text: string) => void` - Update search query
- `searchQuery: string` - Current search text

---

### renderCustomTabs

Replace the category tabs with your own navigation:

```jsx
<EmojiPickerModal
  visible={true}
  onClose={() => {}}
  onEmojiSelect={(emoji) => console.log(emoji)}
  emojis={emojiData}
  renderCustomTabs={({ categories, activeCategory, onCategoryPress }) => (
    <ScrollView horizontal style={{ padding: 10 }}>
      {categories.map((category) => (
        <TouchableOpacity
          key={category}
          onPress={() => onCategoryPress(category)}
          style={{
            padding: 12,
            marginHorizontal: 4,
            borderRadius: 8,
            backgroundColor: activeCategory === category ? '#007AFF' : '#f0f0f0',
          }}
        >
          <Text
            style={{
              color: activeCategory === category ? '#ffffff' : '#333333',
              fontWeight: activeCategory === category ? 'bold' : 'normal',
            }}
          >
            {category}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  )}
/>
```

**Props provided:**
- `categories: string[]` - Array of category names
- `activeCategory: string | null` - Currently active category
- `onCategoryPress: (category: string) => void` - Switch category

---

### renderCustomSkinToneSelector

Replace the skin tone selector:

```jsx
<EmojiPickerModal
  visible={true}
  onClose={() => {}}
  onEmojiSelect={(emoji) => console.log(emoji)}
  emojis={emojiData}
  showSkinToneSelector={true}
  renderCustomSkinToneSelector={({ selectedSkinTone, onSkinToneChange, skinTones }) => (
    <View style={{ flexDirection: 'row', padding: 10 }}>
      {skinTones.map((tone) => (
        <TouchableOpacity
          key={tone.name}
          onPress={() => onSkinToneChange(tone.modifier)}
          style={{
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: tone.color,
            marginHorizontal: 4,
            borderWidth: selectedSkinTone === tone.modifier ? 3 : 1,
            borderColor: selectedSkinTone === tone.modifier ? '#007AFF' : '#cccccc',
          }}
        />
      ))}
    </View>
  )}
/>
```

**Props provided:**
- `selectedSkinTone: string` - Current skin tone modifier
- `onSkinToneChange: (tone: string) => void` - Change skin tone
- `skinTones: typeof SKIN_TONES` - Array of all available skin tones

**SKIN_TONES structure:**
```javascript
[
  { name: 'Default', modifier: '', color: '#FFDE00' },
  { name: 'Light', modifier: '🏻', color: '#F7D7C4' },
  { name: 'Medium-Light', modifier: '🏼', color: '#D8B094' },
  { name: 'Medium', modifier: '🏽', color: '#BB9167' },
  { name: 'Medium-Dark', modifier: '🏾', color: '#8E562E' },
  { name: 'Dark', modifier: '🏿', color: '#613D30' },
]
```

---

### renderCategoryHeader

Customize how category headers are displayed:

```jsx
<EmojiPickerModal
  visible={true}
  onClose={() => {}}
  onEmojiSelect={(emoji) => console.log(emoji)}
  emojis={emojiData}
  renderCategoryHeader={({ category, displayName }) => (
    <View
      style={{
        padding: 16,
        backgroundColor: '#f8f9fa',
        borderLeftWidth: 4,
        borderLeftColor: '#007AFF',
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          color: '#007AFF',
          textTransform: 'uppercase',
        }}
      >
        {displayName}
      </Text>
    </View>
  )}
/>
```

**Props provided:**
- `category: string` - Original category name
- `displayName: string` - Display name (after categoryNameMap applied)

---

## Category Filtering & Ordering

### Exclude Specific Categories

Hide categories you don't want:

```jsx
<EmojiPickerModal
  visible={true}
  onClose={() => {}}
  onEmojiSelect={(emoji) => console.log(emoji)}
  emojis={emojiData}
  excludeCategories={['Flags', 'Symbols']}
/>
```

### Include Only Specific Categories

Show only selected categories:

```jsx
<EmojiPickerModal
  visible={true}
  onClose={() => {}}
  onEmojiSelect={(emoji) => console.log(emoji)}
  emojis={emojiData}
  includeCategories={['Smileys & Emotion', 'People & Body']}
/>
```

### Custom Category Order

Reorder categories:

```jsx
<EmojiPickerModal
  visible={true}
  onClose={() => {}}
  onEmojiSelect={(emoji) => console.log(emoji)}
  emojis={emojiData}
  categoryOrder={[
    'Food & Drink',
    'Smileys & Emotion',
    'Animals & Nature',
    'People & Body',
    'Travel & Places',
    'Activities',
    'Objects',
    'Symbols',
    'Flags',
  ]}
/>
```

**Note:** Categories not in the order array will appear after ordered ones in default order.

---

## Category Name Customization

Rename category display names:

```jsx
<EmojiPickerModal
  visible={true}
  onClose={() => {}}
  onEmojiSelect={(emoji) => console.log(emoji)}
  emojis={emojiData}
  categoryNameMap={{
    'Smileys & Emotion': '😀 Faces',
    'People & Body': '👤 People',
    'Animals & Nature': '🌿 Nature',
    'Food & Drink': '🍕 Food',
    'Travel & Places': '✈️ Travel',
    'Activities': '⚽ Sports',
    'Objects': '💡 Things',
    'Symbols': '#️⃣ Symbols',
    'Flags': '🏳️ Flags',
  }}
/>
```

---

## Emoji Filtering

### Exclude Specific Emojis

Remove specific emojis from the picker:

```jsx
<EmojiPickerModal
  visible={true}
  onClose={() => {}}
  onEmojiSelect={(emoji) => console.log(emoji)}
  emojis={emojiData}
  excludeEmojis={['🍆', '🍑', '💩']}
/>
```

### Include Only Specific Emojis

Show only selected emojis (useful for limited sets):

```jsx
<EmojiPickerModal
  visible={true}
  onClose={() => {}}
  onEmojiSelect={(emoji) => console.log(emoji)}
  emojis={emojiData}
  includeEmojis={['😀', '😂', '❤️', '👍', '🎉', '🔥']}
/>
```

**Common use case:** Quick reactions in chat apps

```jsx
const REACTIONS = ['👍', '❤️', '😂', '😮', '😢', '🔥'];

<EmojiPickerModal
  visible={true}
  onClose={() => {}}
  onEmojiSelect={(emoji) => console.log(emoji)}
  emojis={emojiData}
  includeEmojis={REACTIONS}
  showSearchBar={false}
  showTabs={false}
/>
```

---

## Performance Optimization

### FlatList Performance Props

Fine-tune rendering performance for large emoji datasets:

```jsx
<EmojiPickerModal
  visible={true}
  onClose={() => {}}
  onEmojiSelect={(emoji) => console.log(emoji)}
  emojis={emojiData}
  // Render fewer items initially
  initialNumToRender={20}
  
  // Smaller batches for smoother scrolling
  maxToRenderPerBatch={10}
  
  // Update cells more frequently
  updateCellsBatchingPeriod={50}
  
  // Smaller render window
  windowSize={5}
  
  // Remove offscreen views (careful on Android)
  removeClippedSubviews={true}
/>
```

**Performance Tips:**

| Prop | Recommended Value | Effect |
|------|-------------------|--------|
| `initialNumToRender` | 15-30 | Faster initial mount |
| `maxToRenderPerBatch` | 5-10 | Smoother scrolling |
| `updateCellsBatchingPeriod` | 50-100 | More responsive |
| `windowSize` | 3-7 | Fewer items in memory |
| `removeClippedSubviews` | `true` (iOS) | Memory optimization |

**Note:** `removeClippedSubviews` can cause layout issues on Android. Test thoroughly.

---

## Platform-Specific Customization

### Web-Specific Styling

```jsx
import { Platform } from 'react-native';

<EmojiPickerModal
  visible={true}
  onClose={() => {}}
  onEmojiSelect={(emoji) => console.log(emoji)}
  emojis={emojiData}
  searchInputStyle={Platform.select({
    web: {
      outlineStyle: 'none',
      cursor: 'text',
    },
    default: {},
  })}
/>
```

### iOS vs Android

```jsx
<EmojiPickerModal
  visible={true}
  onClose={() => {}}
  onEmojiSelect={(emoji) => console.log(emoji)}
  emojis={emojiData}
  removeClippedSubviews={Platform.OS === 'ios'}
/>
```

---

## Custom Tab Icon Colors

Customize the color of each category icon:

```jsx
<EmojiPickerModal
  visible={true}
  onClose={() => {}}
  onEmojiSelect={(emoji) => console.log(emoji)}
  emojis={emojiData}
  tabIconColors={{
    'Recently Used': '#9333ea',
    'Smileys & Emotion': '#6366f1',
    'People & Body': '#ec4899',
    'Animals & Nature': '#10b981',
    'Food & Drink': '#f59e0b',
    'Travel & Places': '#3b82f6',
    'Activities': '#8b5cf6',
    'Objects': '#ef4444',
    'Symbols': '#6b7280',
    'Flags': '#0ea5e9',
  }}
/>
```

**Default colors are provided if not specified.**

---

## Combining Multiple Features

Create a highly customized picker:

```jsx
<EmojiPickerModal
  visible={true}
  onClose={() => {}}
  onEmojiSelect={(emoji) => console.log(emoji)}
  emojis={emojiData}
  
  // Filter to specific categories
  includeCategories={[
    'Smileys & Emotion',
    'People & Body',
    'Food & Drink',
  ]}
  
  // Custom order
  categoryOrder={[
    'Food & Drink',
    'Smileys & Emotion',
    'People & Body',
  ]}
  
  // Rename categories
  categoryNameMap={{
    'Smileys & Emotion': '😀 Emojis',
    'People & Body': '👤 People',
    'Food & Drink': '🍕 Food',
  }}
  
  // Custom tab colors
  tabIconColors={{
    'Food & Drink': '#ff6b6b',
    'Smileys & Emotion': '#4ecdc4',
    'People & Body': '#45b7d1',
  }}
  
  // Custom search
  renderCustomSearch={({ onSearch, searchQuery }) => (
    <CustomSearchComponent
      value={searchQuery}
      onChange={onSearch}
    />
  )}
  
  // Performance optimization
  initialNumToRender={20}
  maxToRenderPerBatch={10}
  windowSize={5}
/>
```

---

## TypeScript Support

All advanced features have full TypeScript support:

```typescript
import type {
  EmojiPickerModalProps,
  EmojiData,
} from '@hiraku-ai/react-native-emoji-picker';

const advancedProps: Partial<EmojiPickerModalProps> = {
  excludeCategories: ['Flags'],
  categoryOrder: ['Smileys & Emotion'],
  renderCustomSearch: ({ onSearch, searchQuery }) => {
    // Full type safety
    return <CustomSearch />;
  },
};
```
