import { EmojiData } from '../types/emoji';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Standard category order
const EMOJI_CATEGORIES_ORDER = [
  'Smileys & Emotion',
  'People & Body',
  'Animals & Nature',
  'Food & Drink',
  'Travel & Places',
  'Activities',
  'Objects',
  'Symbols',
  'Flags',
];

// Simple sort function for categories
const sortCategories = (a: string, b: string): number => {
  const indexA = EMOJI_CATEGORIES_ORDER.indexOf(a);
  const indexB = EMOJI_CATEGORIES_ORDER.indexOf(b);
  
  if (indexA !== -1 && indexB !== -1) {
    return indexA - indexB;
  }
  
  if (indexA !== -1) return -1;
  if (indexB !== -1) return 1;
  
  return a.localeCompare(b);
};

export const groupEmojisByCategory = (emojis: EmojiData[]) => {
  // Group emojis by category
  const categorized = emojis.reduce((acc, emoji) => {
    const category = emoji.category;
    
    if (!acc[category]) {
      acc[category] = [];
    }
    
    acc[category].push(emoji);
    return acc;
  }, {} as Record<string, EmojiData[]>);
  
  // Convert to array format for SectionList
  const result = Object.keys(categorized)
    .sort(sortCategories)
    .map(category => ({
      title: category,
      data: categorized[category]
    }));
  
  return result;
};

export const searchEmojis = (emojis: EmojiData[], query: string): EmojiData[] => {
  const searchTerm = query.toLowerCase().trim();
  
  if (!searchTerm) return emojis;
  
  return emojis.filter((emoji) => {
    return (
      emoji.description.toLowerCase().includes(searchTerm) ||
      emoji.aliases.some((alias) => alias.toLowerCase().includes(searchTerm)) ||
      emoji.tags.some((tag) => tag.toLowerCase().includes(searchTerm)) ||
      emoji.emoji.includes(searchTerm)
    );
  });
};

// Storage key for recent emojis
const RECENT_EMOJIS_KEY = 'recentEmojis';
const MAX_RECENT_EMOJIS = 30;

export const getRecentlyUsedEmojis = async (): Promise<string[]> => {
  try {
    const stored = await AsyncStorage.getItem(RECENT_EMOJIS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error('Failed to load recent emojis:', e);
    return [];
  }
};

export const saveRecentlyUsedEmoji = async (emoji: string): Promise<void> => {
  try {
    // Get current recents
    const current = await getRecentlyUsedEmojis();
    
    // Remove if already exists (to avoid duplicates)
    const filtered = current.filter(e => e !== emoji);
    
    // Add to beginning and limit size
    const updated = [emoji, ...filtered].slice(0, MAX_RECENT_EMOJIS);
    
    // Save to storage
    await AsyncStorage.setItem(RECENT_EMOJIS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save recent emoji:', e);
  }
};

export const createEmojiSectionsWithRecents = async (
  emojis: EmojiData[]
): Promise<Array<{ title: string; data: EmojiData[] }>> => {
  // Get recently used emojis
  const recentEmojiCodes = await getRecentlyUsedEmojis();
  
  // Early return if no recents and no emojis
  if (!recentEmojiCodes.length && !emojis.length) {
    return [];
  }
  
  // If we have recents, create a "Recent" section
  let sections = [];
  
  if (recentEmojiCodes.length) {
    // Find the full emoji data for each recent emoji code
    const recentEmojis = recentEmojiCodes
      .map(code => emojis.find(emoji => emoji.emoji === code))
      .filter(Boolean) as EmojiData[];
    
    if (recentEmojis.length) {
      sections.push({
        title: 'Recently Used',
        data: recentEmojis,
      });
    }
  }
  
  // Add the regular categorized emojis
  return [...sections, ...groupEmojisByCategory(emojis)];
};