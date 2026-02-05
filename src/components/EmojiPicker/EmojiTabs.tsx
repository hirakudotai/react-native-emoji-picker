import React, { useCallback, useMemo } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, ViewStyle, Platform } from 'react-native';
import { 
  MoodSmileIcon, 
  UserIcon, 
  LeafIcon, 
  PizzaIcon, 
  CarIcon, 
  DeviceGamepadIcon,
  BulbIcon, 
  HashIcon, 
  FlagIcon,
  HistoryIcon 
} from '../../assets/icons';
import { useEmojiPickerTheme } from '../../theme';

interface EmojiTabsProps {
  categories: string[];
  activeCategory: string | null;
  onCategoryPress: (category: string) => void;
  tabIconColors?: Record<string, string>;
  tabsContainerStyle?: ViewStyle;
  tabStyle?: ViewStyle;
  activeTabStyle?: ViewStyle;
}

// Default colors for category icons
const DEFAULT_ICON_COLORS: Record<string, string> = {
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
};

export function EmojiTabs({ 
  categories, 
  activeCategory, 
  onCategoryPress, 
  tabIconColors = {},
  tabsContainerStyle,
  tabStyle,
  activeTabStyle,
}: EmojiTabsProps) {
  const { theme } = useEmojiPickerTheme();
  
  // Default layout values
  const CONTAINER_HEIGHT = 56;
  const BORDER_WIDTH = 1;
  const ICON_SIZE = 22;
  const BUTTON_WIDTH = 44;
  const BUTTON_HEIGHT = 44;
  const BUTTON_BORDER_RADIUS = 10;
  const BUTTON_MARGIN_H = 4;
  const CONTENT_PADDING_H = 12;
  
  // Memoize theme colors
  const themedColors = useMemo(() => ({
    tabsBorder: theme.colors.tabsBorder,
    tabBackground: theme.colors.tabBackground,
    tabActiveBackground: theme.colors.tabActiveBackground,
    icon: theme.colors.icon,
  }), [theme]);
  
  // Get the color for a category, using custom color if provided or default color as fallback
  const getCategoryColor = useCallback((category: string) => {
    return tabIconColors[category] || DEFAULT_ICON_COLORS[category] || themedColors.icon;
  }, [tabIconColors, themedColors.icon]);

  // Create dynamic category icons with custom colors
  const getCategoryIcon = useCallback((category: string) => {
    const color = getCategoryColor(category);
    
    switch (category) {
      case 'Recently Used':
        return <HistoryIcon size={ICON_SIZE} color={color} />;
      case 'Smileys & Emotion':
        return <MoodSmileIcon size={ICON_SIZE} color={color} />;
      case 'People & Body':
        return <UserIcon size={ICON_SIZE} color={color} />;
      case 'Animals & Nature':
        return <LeafIcon size={ICON_SIZE} color={color} />;
      case 'Food & Drink':
        return <PizzaIcon size={ICON_SIZE} color={color} />;
      case 'Travel & Places':
        return <CarIcon size={ICON_SIZE} color={color} />;
      case 'Activities':
        return <DeviceGamepadIcon size={ICON_SIZE} color={color} />;
      case 'Objects':
        return <BulbIcon size={ICON_SIZE} color={color} />;
      case 'Symbols':
        return <HashIcon size={ICON_SIZE} color={color} />;
      case 'Flags':
        return <FlagIcon size={ICON_SIZE} color={color} />;
      default:
        return <HashIcon size={ICON_SIZE} color={color} />;
    }
  }, [getCategoryColor]);

  // Memoize style arrays
  const containerStyle = useMemo(() => [
    styles.container,
    {
      height: CONTAINER_HEIGHT,
      borderBottomWidth: BORDER_WIDTH,
      borderBottomColor: themedColors.tabsBorder,
    },
    tabsContainerStyle
  ], [themedColors.tabsBorder, tabsContainerStyle]);

  const defaultTabStyle = useMemo(() => [
    styles.tabButton,
    {
      width: BUTTON_WIDTH,
      height: BUTTON_HEIGHT,
      borderRadius: BUTTON_BORDER_RADIUS,
      marginHorizontal: BUTTON_MARGIN_H,
      backgroundColor: themedColors.tabBackground,
    },
    tabStyle,
  ], [themedColors.tabBackground, tabStyle]);

  const defaultActiveTabStyle = useMemo(() => [
    styles.tabButtonActive,
    { backgroundColor: themedColors.tabActiveBackground },
    activeTabStyle
  ], [themedColors.tabActiveBackground, activeTabStyle]);

  const renderItem = useCallback(({ item }: { item: string }) => {
    const isActive = activeCategory === item;
    return (
      <TouchableOpacity
        onPress={() => onCategoryPress(item)}
        style={[
          defaultTabStyle,
          isActive && defaultActiveTabStyle
        ]}
        activeOpacity={0.6}
        accessibilityRole="tab"
        accessibilityLabel={`${item} category`}
        accessibilityState={{ selected: isActive }}
        accessibilityHint="Double tap to view this emoji category"
      >
        {getCategoryIcon(item)}
      </TouchableOpacity>
    );
  }, [activeCategory, onCategoryPress, getCategoryIcon, defaultActiveTabStyle, defaultTabStyle]);

  return (
    <View style={containerStyle}>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          styles.tabsContent, 
          { paddingHorizontal: CONTENT_PADDING_H }
        ]}
        {...Platform.select({
          web: {
            scrollEnabled: true,
            // @ts-ignore - web only property for mouse wheel support
            onWheel: (e: any) => {
              const list = e.currentTarget;
              if (list) {
                list.scrollLeft += e.deltaY;
              }
            }
          },
          default: {}
        })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // All styling now via props and theme
  },
  tabsContent: {
    // All styling now via props and theme
  },
  tabButton: {
    justifyContent: 'center',
    alignItems: 'center',
    // All other styling now via props and theme
  },
  tabButtonActive: {
    // All styling now via props and theme
  },
});

export default EmojiTabs;