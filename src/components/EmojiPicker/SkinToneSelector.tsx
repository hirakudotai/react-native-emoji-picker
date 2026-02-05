import React, { useMemo } from 'react';
import { View, TouchableOpacity, ViewStyle } from 'react-native';
import { useEmojiPickerTheme } from '../../theme';
import { SKIN_TONES } from './constants';
import { styles } from './styles';

interface SkinToneSelectorProps {
  selectedSkinTone: string;
  onSkinToneChange: (tone: string) => void;
  skinToneSelectorStyle?: ViewStyle;
  skinToneButtonStyle?: ViewStyle;
  renderCustomSkinToneSelector?: (props: {
    selectedSkinTone: string;
    onSkinToneChange: (tone: string) => void;
    skinTones: typeof SKIN_TONES;
  }) => React.ReactNode;
}

export const SkinToneSelector: React.FC<SkinToneSelectorProps> = ({
  selectedSkinTone,
  onSkinToneChange,
  skinToneSelectorStyle,
  skinToneButtonStyle,
  renderCustomSkinToneSelector,
}) => {
  const { theme } = useEmojiPickerTheme();
  
  // Default layout values
  const BUTTON_SIZE = 24;
  const BUTTON_BORDER_RADIUS = 12;
  
  const themedStyles = useMemo(() => ({
    skinToneButtonBorder: theme.colors.skinToneButtonBorder,
    accent: theme.colors.accent,
  }), [theme]);

  if (renderCustomSkinToneSelector) {
    return (
      <>
        {renderCustomSkinToneSelector({
          selectedSkinTone,
          onSkinToneChange,
          skinTones: SKIN_TONES,
        })}
      </>
    );
  }

  return (
    <View style={[styles.skinToneSelector, skinToneSelectorStyle]}>
      {SKIN_TONES.map((tone) => {
        const isSelected = selectedSkinTone === tone.modifier;
        return (
          <TouchableOpacity
            key={tone.name}
            onPress={() => onSkinToneChange(tone.modifier)}
            style={[
              styles.skinToneButton,
              { 
                backgroundColor: tone.color,
                width: BUTTON_SIZE,
                height: BUTTON_SIZE,
                borderRadius: BUTTON_BORDER_RADIUS,
                borderColor: themedStyles.skinToneButtonBorder
              },
              isSelected && [
                styles.skinToneButtonActive,
                { borderColor: themedStyles.accent }
              ],
              skinToneButtonStyle
            ]}
            accessibilityRole="button"
            accessibilityLabel={`${tone.name} skin tone`}
            accessibilityState={{ selected: isSelected }}
            accessibilityHint="Double tap to select this skin tone for emojis"
          />
        );
      })}
    </View>
  );
};
