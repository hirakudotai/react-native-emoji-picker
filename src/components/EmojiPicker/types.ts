import { ViewStyle, TextStyle } from 'react-native';
import { EmojiData } from '../../types/emoji';
import { PartialTheme } from '../../theme';
import { SKIN_TONES } from './constants';

// Item types for FlatList
export type FlatListItem = 
  | { type: 'header'; category: string; id: string }
  | { type: 'emojiRow'; emojis: EmojiData[]; id: string };

export interface Section {
  title: string;
  data: EmojiData[];
}

export interface EmojiPickerProps {
  // Core functionality
  onEmojiSelect: (emoji: string) => void;
  emojis: EmojiData[];
  onClose?: () => void;
  
  // Feature toggles
  showHistoryTab?: boolean;
  showSearchBar?: boolean;
  showTabs?: boolean;
  showSkinToneSelector?: boolean;
  showSearchIcon?: boolean;
  
  // Category filtering and ordering
  excludeCategories?: string[];
  includeCategories?: string[];
  categoryOrder?: string[];
  categoryNameMap?: Record<string, string>;
  
  // Emoji filtering
  excludeEmojis?: string[];
  includeEmojis?: string[];
  
  // Layout
  columns?: number;
  
  // Behavior
  maxRecentEmojis?: number;
  defaultSkinTone?: string;
  searchDebounceMs?: number;
  searchMinChars?: number;
  animationType?: 'none' | 'slide' | 'fade';
  
  // Styles - one per logical element
  containerStyle?: ViewStyle;
  searchBarStyle?: ViewStyle;
  searchInputStyle?: TextStyle;
  tabsContainerStyle?: ViewStyle;
  tabStyle?: ViewStyle;
  activeTabStyle?: ViewStyle;
  categoryHeaderStyle?: TextStyle;
  categoryContainerStyle?: ViewStyle;
  emojiButtonStyle?: ViewStyle;
  skinToneSelectorStyle?: ViewStyle;
  skinToneButtonStyle?: ViewStyle;
  noResultsStyle?: TextStyle;
  
  // Custom text/colors
  searchPlaceholder?: string;
  tabIconColors?: Record<string, string>;
  
  // Theme
  darkMode?: boolean;
  theme?: PartialTheme;
  
  // Custom renders
  renderCustomTabs?: (props: {
    categories: string[];
    activeCategory: string | null;
    onCategoryPress: (category: string) => void;
  }) => React.ReactNode;
  renderCustomSearch?: (props: {
    onSearch: (text: string) => void;
    searchQuery: string;
  }) => React.ReactNode;
  renderCustomSkinToneSelector?: (props: {
    selectedSkinTone: string;
    onSkinToneChange: (tone: string) => void;
    skinTones: typeof SKIN_TONES;
  }) => React.ReactNode;
  renderCategoryHeader?: (props: {
    category: string;
    displayName: string;
  }) => React.ReactNode;
  
  // FlatList performance
  initialNumToRender?: number;
  maxToRenderPerBatch?: number;
  updateCellsBatchingPeriod?: number;
  windowSize?: number;
  removeClippedSubviews?: boolean;
}

export interface EmojiPickerModalProps extends Omit<EmojiPickerProps, 'onClose'> {
  visible: boolean;
  onClose: () => void;
  
  // Modal-specific
  modalTitle?: string;
  modalStyle?: ViewStyle;
  modalHeaderStyle?: ViewStyle;
  modalTitleStyle?: TextStyle;
  modalCloseButtonStyle?: ViewStyle;
  modalWidthPercentage?: number;
  modalHeightPercentage?: number;
  modalMaxWidth?: number;
  modalMaxHeight?: number;
}
