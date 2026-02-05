# Theming Guide

Complete guide to customizing colors and styling the emoji picker.

## Quick Start

### Using Built-in Themes

The library includes light and dark themes ready to use:

```jsx
import EmojiPickerModal, { 
  emojiData,
  EmojiPickerThemeProvider,
  darkTheme 
} from '@hiraku-ai/react-native-emoji-picker';

function App() {
  return (
    <EmojiPickerThemeProvider theme={darkTheme}>
      <EmojiPickerModal
        visible={true}
        onClose={() => {}}
        onEmojiSelect={(emoji) => console.log(emoji)}
        emojis={emojiData}
      />
    </EmojiPickerThemeProvider>
  );
}
```

### Simple Dark Mode Toggle

```jsx
import { lightTheme, darkTheme } from '@hiraku-ai/react-native-emoji-picker';

function App() {
  const [isDark, setIsDark] = useState(false);
  
  return (
    <EmojiPickerThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <YourApp />
    </EmojiPickerThemeProvider>
  );
}
```

---

## Theme Structure

A theme is an object with `colors` and `opacity` properties:

```typescript
interface EmojiPickerTheme {
  colors: {
    // 45+ color properties
  };
  opacity: {
    modalOverlay: number;
  };
}
```

---

## All Theme Colors

### Background Colors

| Property | Light Theme | Dark Theme | Description |
|----------|-------------|------------|-------------|
| `background` | `#ffffff` | `#1a1a1a` | Main background |
| `backgroundSecondary` | `#f9fafb` | `#2a2a2a` | Secondary background |
| `modalBackground` | `#ffffff` | `#1a1a1a` | Modal container background |
| `headerBackground` | `transparent` | `transparent` | Modal header background |
| `searchBackground` | `#f1f5f9` | `#333333` | Search input background |
| `tabBackground` | `transparent` | `rgba(255,255,255,0.05)` | Inactive tab background |
| `tabActiveBackground` | `#f0f0f5` | `#333333` | Active tab background |
| `emojiButtonBackground` | `transparent` | `transparent` | Emoji button background |
| `skinToneButtonBorder` | `rgba(0,0,0,0.1)` | `rgba(255,255,255,0.2)` | Skin tone button border |

### Text Colors

| Property | Light Theme | Dark Theme | Description |
|----------|-------------|------------|-------------|
| `text` | `#1f2937` | `#f5f5f5` | Primary text color |
| `textSecondary` | `#6b7280` | `#aaaaaa` | Secondary text |
| `textTertiary` | `#9ca3af` | `#888888` | Tertiary text |
| `headerTitle` | `#333333` | `#f5f5f5` | Modal title text |
| `categoryTitle` | `#666666` | `#aaaaaa` | Category header text |
| `placeholder` | `#9ca3af` | `#888888` | Search placeholder text |
| `noResults` | `#666666` | `#aaaaaa` | No results message text |

### Border Colors

| Property | Light Theme | Dark Theme | Description |
|----------|-------------|------------|-------------|
| `border` | `#e5e7eb` | `#404040` | Primary border color |
| `borderLight` | `#f0f0f0` | `#333333` | Light border color |
| `headerBorder` | `transparent` | `#333333` | Header bottom border |
| `tabsBorder` | `#eeeeee` | `#333333` | Tabs bottom border |
| `categoryDivider` | `#f0f0f0` | `#333333` | Between categories |

### Interactive Colors

| Property | Light Theme | Dark Theme | Description |
|----------|-------------|------------|-------------|
| `accent` | `#007AFF` | `#0A84FF` | Primary accent color |
| `accentSecondary` | `#0A84FF` | `#007AFF` | Secondary accent |

### Icon Colors

| Property | Light Theme | Dark Theme | Description |
|----------|-------------|------------|-------------|
| `icon` | `#9ca3af` | `#888888` | Default icon color |
| `iconActive` | `#6b7280` | `#aaaaaa` | Active icon color |
| `closeIcon` | `#666666` | `#aaaaaa` | Close button icon |

### Overlay

| Property | Light Theme | Dark Theme | Description |
|----------|-------------|------------|-------------|
| `modalOverlay` | `rgba(0,0,0,0.5)` | `rgba(0,0,0,0.7)` | Modal backdrop color |

### Opacity

| Property | Light Theme | Dark Theme | Description |
|----------|-------------|------------|-------------|
| `opacity.modalOverlay` | `1` | `1` | Modal overlay opacity |

---

## Creating Custom Themes

### Full Custom Theme

```jsx
import { EmojiPickerThemeProvider } from '@hiraku-ai/react-native-emoji-picker';

const brandTheme = {
  colors: {
    // Backgrounds
    background: '#ffffff',
    backgroundSecondary: '#f8f9fa',
    modalBackground: '#ffffff',
    headerBackground: '#8b5cf6',
    searchBackground: '#f3f4f6',
    tabBackground: 'transparent',
    tabActiveBackground: '#ede9fe',
    emojiButtonBackground: 'transparent',
    skinToneButtonBorder: '#e5e7eb',
    
    // Text
    text: '#1f2937',
    textSecondary: '#6b7280',
    textTertiary: '#9ca3af',
    headerTitle: '#ffffff',
    categoryTitle: '#8b5cf6',
    placeholder: '#9ca3af',
    noResults: '#6b7280',
    
    // Borders
    border: '#e5e7eb',
    borderLight: '#f3f4f6',
    headerBorder: 'transparent',
    tabsBorder: '#e5e7eb',
    categoryDivider: '#f3f4f6',
    
    // Interactive
    accent: '#8b5cf6',
    accentSecondary: '#7c3aed',
    
    // Icons
    icon: '#9ca3af',
    iconActive: '#8b5cf6',
    closeIcon: '#ffffff',
    
    // Overlay
    modalOverlay: 'rgba(139, 92, 246, 0.15)',
  },
  opacity: {
    modalOverlay: 1,
  },
};

function App() {
  return (
    <EmojiPickerThemeProvider theme={brandTheme}>
      <YourApp />
    </EmojiPickerThemeProvider>
  );
}
```

### Partial Theme (Override Specific Colors)

Use `PartialTheme` to override only specific colors:

```jsx
import { 
  EmojiPickerThemeProvider, 
  lightTheme 
} from '@hiraku-ai/react-native-emoji-picker';

const customTheme = {
  colors: {
    ...lightTheme.colors,
    accent: '#ff6b6b',
    accentSecondary: '#ff5252',
    headerBackground: '#ff6b6b',
    tabActiveBackground: '#ffe0e0',
    categoryTitle: '#ff6b6b',
  },
  opacity: lightTheme.opacity,
};
```

---

## Inline Theme Override

You can also pass a partial theme directly to the component:

```jsx
<EmojiPickerModal
  visible={true}
  onClose={() => {}}
  onEmojiSelect={(emoji) => console.log(emoji)}
  emojis={emojiData}
  theme={{
    colors: {
      accent: '#ff6b6b',
      tabActiveBackground: '#ffe0e0',
    }
  }}
/>
```

---

## Using the Theme Hook

Access theme values in custom components:

```jsx
import { useEmojiPickerTheme } from '@hiraku-ai/react-native-emoji-picker';

function CustomComponent() {
  const { theme } = useEmojiPickerTheme();
  
  return (
    <View style={{ backgroundColor: theme.colors.background }}>
      <Text style={{ color: theme.colors.text }}>
        Custom UI with theme colors
      </Text>
    </View>
  );
}
```

---

## Common Theme Examples

### High Contrast Theme

```javascript
const highContrastTheme = {
  colors: {
    background: '#000000',
    backgroundSecondary: '#1a1a1a',
    modalBackground: '#000000',
    headerBackground: '#ffffff',
    searchBackground: '#ffffff',
    tabBackground: 'transparent',
    tabActiveBackground: '#ffffff',
    emojiButtonBackground: 'transparent',
    skinToneButtonBorder: '#ffffff',
    
    text: '#ffffff',
    textSecondary: '#ffffff',
    textTertiary: '#cccccc',
    headerTitle: '#000000',
    categoryTitle: '#ffffff',
    placeholder: '#cccccc',
    noResults: '#ffffff',
    
    border: '#ffffff',
    borderLight: '#666666',
    headerBorder: '#000000',
    tabsBorder: '#ffffff',
    categoryDivider: '#666666',
    
    accent: '#ffff00',
    accentSecondary: '#ffff00',
    
    icon: '#ffffff',
    iconActive: '#ffff00',
    closeIcon: '#000000',
    
    modalOverlay: 'rgba(0, 0, 0, 0.95)',
  },
  opacity: {
    modalOverlay: 1,
  },
};
```

### Minimalist Theme

```javascript
const minimalistTheme = {
  colors: {
    background: '#ffffff',
    backgroundSecondary: '#ffffff',
    modalBackground: '#ffffff',
    headerBackground: 'transparent',
    searchBackground: '#ffffff',
    tabBackground: 'transparent',
    tabActiveBackground: 'transparent',
    emojiButtonBackground: 'transparent',
    skinToneButtonBorder: '#e0e0e0',
    
    text: '#000000',
    textSecondary: '#666666',
    textTertiary: '#999999',
    headerTitle: '#000000',
    categoryTitle: '#999999',
    placeholder: '#cccccc',
    noResults: '#999999',
    
    border: '#e0e0e0',
    borderLight: '#f0f0f0',
    headerBorder: '#e0e0e0',
    tabsBorder: '#e0e0e0',
    categoryDivider: '#f5f5f5',
    
    accent: '#000000',
    accentSecondary: '#333333',
    
    icon: '#999999',
    iconActive: '#000000',
    closeIcon: '#000000',
    
    modalOverlay: 'rgba(0, 0, 0, 0.2)',
  },
  opacity: {
    modalOverlay: 1,
  },
};
```

---

## darkMode Prop

The `darkMode` boolean is supported for quick toggles, but the theme system gives full control:

```jsx
// Quick toggle
<EmojiPickerModal darkMode={true} />

// Full theme control
<EmojiPickerThemeProvider theme={darkTheme}>
  <EmojiPickerModal />
</EmojiPickerThemeProvider>
```

---

## TypeScript Support

Full TypeScript definitions included:

```typescript
import type { 
  EmojiPickerTheme, 
  PartialTheme 
} from '@hiraku-ai/react-native-emoji-picker';

const myTheme: EmojiPickerTheme = {
  // Full type safety
};

const override: PartialTheme = {
  colors: {
    accent: '#ff0000',
  }
};
```
