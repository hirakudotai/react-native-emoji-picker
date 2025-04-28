import React, { useCallback } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, ViewStyle } from 'react-native';
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

interface EmojiTabsProps {
  categories: string[];
  activeCategory: string | null;
  onCategoryPress: (category: string) => void;
  tabIconColors?: Record<string, string>;
  activeTabStyle?: ViewStyle;
  tabStyle?: ViewStyle;
  darkMode?: boolean;
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
  activeTabStyle,
  tabStyle,
  darkMode = false
}: EmojiTabsProps) {
  // Get the color for a category, using custom color if provided or default color as fallback
  const getCategoryColor = useCallback((category: string) => {
    return tabIconColors[category] || DEFAULT_ICON_COLORS[category] || '#6b7280';
  }, [tabIconColors]);

  // Create dynamic category icons with custom colors
  const getCategoryIcon = useCallback((category: string) => {
    const color = getCategoryColor(category);
    
    switch (category) {
      case 'Recently Used':
        return <HistoryIcon size={22} color={color} />;
      case 'Smileys & Emotion':
        return <MoodSmileIcon size={22} color={color} />;
      case 'People & Body':
        return <UserIcon size={22} color={color} />;
      case 'Animals & Nature':
        return <LeafIcon size={22} color={color} />;
      case 'Food & Drink':
        return <PizzaIcon size={22} color={color} />;
      case 'Travel & Places':
        return <CarIcon size={22} color={color} />;
      case 'Activities':
        return <DeviceGamepadIcon size={22} color={color} />;
      case 'Objects':
        return <BulbIcon size={22} color={color} />;
      case 'Symbols':
        return <HashIcon size={22} color={color} />;
      case 'Flags':
        return <FlagIcon size={22} color={color} />;
      default:
        return <HashIcon size={22} color={color} />;
    }
  }, [getCategoryColor]);

  // Apply dark mode styles
  const containerStyle = [
    styles.container,
    darkMode && { borderBottomColor: '#333' }
  ];

  const defaultTabStyle = [
    styles.tabButton,
    darkMode && { backgroundColor: 'rgba(255, 255, 255, 0.05)' },
    tabStyle,
  ];

  const defaultActiveTabStyle = [
    styles.tabButtonActive,
    darkMode && { backgroundColor: '#333' },
    activeTabStyle
  ];

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
        contentContainerStyle={styles.tabsContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tabsContent: {
    paddingHorizontal: 12,
  },
  tabButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 4,
  },
  tabButtonActive: {
    backgroundColor: '#f0f0f5',
  },
});

export default EmojiTabs;