import React, { useState, useEffect, useRef } from 'react';
import { View, Modal, TouchableOpacity, Text, StyleSheet, Animated, useWindowDimensions } from 'react-native';
import { XIcon } from '../../assets/icons';
import { EmojiPickerThemeProvider, useEmojiPickerTheme } from '../../theme';
import { EmojiPickerModalProps } from './types';
import { EmojiPicker } from './EmojiPicker';
import { styles } from './styles';

// Internal modal wrapper component (uses theme from context)
function EmojiPickerInternal({ 
  onEmojiSelect, 
  emojis, 
  visible, 
  onClose,
  // Feature toggles
  showHistoryTab = true,
  showSearchBar = true,
  showTabs = true,
  showSkinToneSelector,
  // Category filtering and ordering
  excludeCategories,
  includeCategories,
  categoryOrder,
  categoryNameMap,
  // Emoji filtering
  excludeEmojis,
  includeEmojis,
  // Layout
  columns,
  // Behavior
  maxRecentEmojis,
  defaultSkinTone,
  searchDebounceMs,
  searchMinChars,
  animationType = 'fade',
  // Styles
  containerStyle,
  searchBarStyle,
  searchInputStyle,
  tabsContainerStyle,
  tabStyle,
  activeTabStyle,
  categoryHeaderStyle,
  categoryContainerStyle,
  emojiButtonStyle,
  skinToneSelectorStyle,
  skinToneButtonStyle,
  noResultsStyle,
  // Custom text/colors
  searchPlaceholder,
  tabIconColors,
  // Theme
  darkMode = false,
  // Custom renders
  renderCustomTabs,
  renderCustomSearch,
  renderCustomSkinToneSelector,
  renderCategoryHeader,
  // FlatList performance
  initialNumToRender,
  maxToRenderPerBatch,
  updateCellsBatchingPeriod,
  windowSize,
  removeClippedSubviews,
  // Modal customization
  modalTitle = "Pick an emoji",
  modalStyle,
  modalHeaderStyle,
  modalTitleStyle,
  modalCloseButtonStyle,
  modalWidthPercentage = 0.9,
  modalHeightPercentage = 0.7,
  modalMaxWidth = 450,
  modalMaxHeight = 600,
}: Omit<EmojiPickerModalProps, 'theme'>) {
  const [isModalVisible, setIsModalVisible] = useState(visible);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const { theme } = useEmojiPickerTheme();

  // Default modal values
  const HEADER_PADDING_H = 16;
  const HEADER_PADDING_TOP = 16;
  const HEADER_PADDING_BOTTOM = 8;
  const CLOSE_ICON_SIZE = 24;

  useEffect(() => {
    if (visible) {
      setIsModalVisible(true);
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start(() => {
        setIsModalVisible(false);
      });
    }
  }, [visible]);

  // Don't render anything if not visible
  if (!isModalVisible && !visible) return null;

  // Calculate dynamic modal dimensions (updates on rotation)
  const { width, height } = useWindowDimensions();
  const modalWidth = width * modalWidthPercentage;
  const modalHeight = height * modalHeightPercentage;

  // Create a style object with the background color and dimensions
  const modalContainerStyle = [
    styles.modalContainer,
    {
      width: modalWidth,
      height: modalHeight,
      maxWidth: modalMaxWidth,
      maxHeight: modalMaxHeight,
      backgroundColor: theme.colors.modalBackground,
    },
    modalStyle
  ];

  const headerStyles = [
    styles.header,
    {
      paddingHorizontal: HEADER_PADDING_H,
      paddingTop: HEADER_PADDING_TOP,
      paddingBottom: HEADER_PADDING_BOTTOM,
      backgroundColor: theme.colors.headerBackground,
      borderBottomColor: theme.colors.headerBorder,
    },
    modalHeaderStyle
  ];

  const headerTitleStyles = [
    styles.headerTitle,
    {
      color: theme.colors.headerTitle
    },
    modalTitleStyle
  ];

  const overlayOpacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, theme.opacity.modalOverlay],
  });

  const contentAnimation = {
    opacity: animationType === 'fade' ? animatedValue : 1,
    transform: [
      {
        translateY: animationType === 'slide' 
          ? animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [600, 0],
            })
          : 0
      }
    ]
  };

  return (
    <Modal
      visible={isModalVisible}
      transparent={true}
      animationType="none"
      hardwareAccelerated={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <Animated.View 
          style={[
            StyleSheet.absoluteFill, 
            { backgroundColor: theme.colors.modalOverlay, opacity: overlayOpacity }
          ]}
        >
          <TouchableOpacity 
            style={StyleSheet.absoluteFill} 
            activeOpacity={1} 
            onPress={onClose} 
          />
        </Animated.View>
        
        <Animated.View style={[modalContainerStyle, contentAnimation]}>
          <View style={headerStyles}>
            <Text style={headerTitleStyles}>{modalTitle}</Text>
            <TouchableOpacity 
              onPress={onClose} 
              style={[styles.closeButton, modalCloseButtonStyle]}
              accessibilityRole="button"
              accessibilityLabel="Close emoji picker"
              accessibilityHint="Double tap to close the emoji picker modal"
            >
              <XIcon 
                size={CLOSE_ICON_SIZE} 
                color={theme.colors.closeIcon} 
              />
            </TouchableOpacity>
          </View>
          
          <EmojiPicker 
            onEmojiSelect={onEmojiSelect} 
            emojis={emojis} 
            onClose={onClose}
            showHistoryTab={showHistoryTab}
            showSearchBar={showSearchBar}
            showTabs={showTabs}
            showSkinToneSelector={showSkinToneSelector}
            excludeCategories={excludeCategories}
            includeCategories={includeCategories}
            categoryOrder={categoryOrder}
            categoryNameMap={categoryNameMap}
            excludeEmojis={excludeEmojis}
            includeEmojis={includeEmojis}
            columns={columns}
            maxRecentEmojis={maxRecentEmojis}
            defaultSkinTone={defaultSkinTone}
            searchDebounceMs={searchDebounceMs}
            searchMinChars={searchMinChars}
            animationType={animationType}
            containerStyle={containerStyle}
            searchBarStyle={searchBarStyle}
            searchInputStyle={searchInputStyle}
            tabsContainerStyle={tabsContainerStyle}
            tabStyle={tabStyle}
            activeTabStyle={activeTabStyle}
            categoryHeaderStyle={categoryHeaderStyle}
            categoryContainerStyle={categoryContainerStyle}
            emojiButtonStyle={emojiButtonStyle}
            skinToneSelectorStyle={skinToneSelectorStyle}
            skinToneButtonStyle={skinToneButtonStyle}
            noResultsStyle={noResultsStyle}
            searchPlaceholder={searchPlaceholder}
            tabIconColors={tabIconColors}
            darkMode={darkMode}
            renderCustomTabs={renderCustomTabs}
            renderCustomSearch={renderCustomSearch}
            renderCustomSkinToneSelector={renderCustomSkinToneSelector}
            renderCategoryHeader={renderCategoryHeader}
            initialNumToRender={initialNumToRender}
            maxToRenderPerBatch={maxToRenderPerBatch}
            updateCellsBatchingPeriod={updateCellsBatchingPeriod}
            windowSize={windowSize}
            removeClippedSubviews={removeClippedSubviews}
          />
        </Animated.View>
      </View>
    </Modal>
  );
}

// Public modal wrapper component with theme provider
export function EmojiPickerModal(props: EmojiPickerModalProps) {
  const { darkMode, theme } = props;
  
  // Always wrap in theme provider since EmojiPickerInternal uses the theme context
  return (
    <EmojiPickerThemeProvider darkMode={darkMode} theme={theme}>
      <EmojiPickerInternal {...props} />
    </EmojiPickerThemeProvider>
  );
}
