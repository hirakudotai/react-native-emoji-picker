import { useState, useCallback, useMemo, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EmojiData } from '../types/emoji';
import { groupEmojisByCategory, searchEmojis } from '../utils/emojiUtils';

const STORAGE_KEY = 'emoji_picker_recent_emojis';

export interface UseEmojiPickerProps {
  emojis: EmojiData[];
  showHistoryTab?: boolean;
  maxRecentEmojis?: number;
  defaultSkinTone?: string;
  columns?: number;
}

export function useEmojiPicker({
  emojis = [],
  showHistoryTab = true,
  maxRecentEmojis = 6,
  defaultSkinTone = '',
  columns = 6,
}: UseEmojiPickerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [recentEmojis, setRecentEmojis] = useState<EmojiData[]>([]);
  const [selectedSkinTone, setSelectedSkinTone] = useState(defaultSkinTone);

  // Load recently used emojis on mount
  useEffect(() => {
    const loadRecentEmojis = async () => {
      if (!showHistoryTab) return;
      try {
        const recentEmojisJson = await AsyncStorage.getItem(STORAGE_KEY);
        if (recentEmojisJson) {
          const parsed = JSON.parse(recentEmojisJson);
          setRecentEmojis(parsed.slice(0, maxRecentEmojis));
        }
      } catch (error) {
        console.error('Failed to load recent emojis:', error);
      }
    };
    loadRecentEmojis();
  }, [showHistoryTab, maxRecentEmojis]);

  // Handle search
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  // Handle skin tone change
  const handleSkinToneChange = useCallback((tone: string) => {
    setSelectedSkinTone(tone);
  }, []);

  // Group emojis by category, including recently used
  const emojiSections = useMemo(() => {
    if (!emojis?.length) return [];
    
    const processedEmojis = searchQuery
      ? searchEmojis(emojis, searchQuery)
      : emojis;
    
    const categories = groupEmojisByCategory(processedEmojis);
    
    if (recentEmojis.length > 0 && !searchQuery && showHistoryTab) {
      return [
        { title: 'Recently Used', data: recentEmojis },
        ...categories
      ];
    }
    
    return categories;
  }, [emojis, searchQuery, recentEmojis, showHistoryTab]);

  // Flatten data for FlatList
  const flatListData = useMemo(() => {
    const items: any[] = [];
    const EMOJIS_PER_ROW = columns;
    
    emojiSections.forEach((section, sectionIndex) => {
      items.push({
        type: 'header',
        category: section.title,
        id: `header-${sectionIndex}`
      });
      
      const emojis = section.data;
      for (let i = 0; i < emojis.length; i += EMOJIS_PER_ROW) {
        const rowEmojis = emojis.slice(i, i + EMOJIS_PER_ROW);
        items.push({
          type: 'emojiRow',
          emojis: rowEmojis,
          id: `row-${sectionIndex}-${i}`
        });
      }
    });
    
    return items;
  }, [emojiSections, columns]);

  // Handle emoji selection with recently used tracking
  const updateRecentEmojis = useCallback((emoji: string) => {
    const selectedEmojiData = emojis.find(e => e.emoji === emoji);
    
    if (selectedEmojiData && showHistoryTab) {
      setRecentEmojis(prevRecent => {
        const filteredRecent = prevRecent.filter(e => e.emoji !== emoji);
        const newRecent = [selectedEmojiData, ...filteredRecent].slice(0, maxRecentEmojis);
        
        const saveRecentEmojis = async (data: EmojiData[]) => {
          try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
          } catch (error) {
            console.error('Failed to save recent emojis:', error);
          }
        };
        
        saveRecentEmojis(newRecent);
        return newRecent;
      });
    }
  }, [emojis, showHistoryTab, maxRecentEmojis]);

  // Helper to get final emoji with skin tone
  const getModifiedEmoji = useCallback((emoji: string) => {
    const emojiDataObj = emojis.find(e => e.emoji === emoji);
    if (emojiDataObj?.skin_tones && selectedSkinTone) {
      return emoji + selectedSkinTone;
    }
    return emoji;
  }, [emojis, selectedSkinTone]);

  // Set first category as active by default, and update if current category disappears
  useEffect(() => {
    if (emojiSections.length > 0) {
      // Check if current active category still exists
      const categoryExists = emojiSections.some(section => section.title === activeCategory);
      
      // If no active category or current one doesn't exist, set to first category
      if (!activeCategory || !categoryExists) {
        setActiveCategory(emojiSections[0].title);
      }
    }
  }, [emojiSections, activeCategory]);

  return {
    searchQuery,
    setSearchQuery: handleSearch,
    activeCategory,
    setActiveCategory,
    recentEmojis,
    selectedSkinTone,
    setSelectedSkinTone: handleSkinToneChange,
    emojiSections,
    flatListData,
    updateRecentEmojis,
    getModifiedEmoji,
  };
}
