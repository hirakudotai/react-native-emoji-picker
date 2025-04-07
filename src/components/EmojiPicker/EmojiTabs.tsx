import React, { useCallback } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { 
  MoodSmileIcon, 
  UserIcon, 
  LeafIcon, 
  PizzaIcon, 
  CarIcon, 
  DeviceGamepadIcon,
  BulbIcon, 
  HashIcon, 
  FlagIcon 
} from '../../assets/icons';

interface EmojiTabsProps {
  categories: string[];
  activeCategory: string | null;
  onCategoryPress: (category: string) => void;
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'Smileys & Emotion': <MoodSmileIcon size={22} color="#6366f1" />,
  'People & Body': <UserIcon size={22} color="#ec4899" />,
  'Animals & Nature': <LeafIcon size={22} color="#10b981" />,
  'Food & Drink': <PizzaIcon size={22} color="#f59e0b" />,
  'Travel & Places': <CarIcon size={22} color="#3b82f6" />,
  'Activities': <DeviceGamepadIcon size={22} color="#8b5cf6" />,
  'Objects': <BulbIcon size={22} color="#ef4444" />,
  'Symbols': <HashIcon size={22} color="#6b7280" />,
  'Flags': <FlagIcon size={22} color="#0ea5e9" />,
};

export function EmojiTabs({ categories, activeCategory, onCategoryPress }: EmojiTabsProps) {
  const renderItem = useCallback(({ item }: { item: string }) => {
    const isActive = activeCategory === item;
    return (
      <TouchableOpacity
        onPress={() => onCategoryPress(item)}
        style={[
          styles.tabButton,
          isActive && styles.tabButtonActive,
        ]}
        activeOpacity={0.6}
      >
        {CATEGORY_ICONS[item] || <HashIcon size={22} color="#6b7280" />}
      </TouchableOpacity>
    );
  }, [activeCategory, onCategoryPress]);

  return (
    <View style={styles.container}>
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