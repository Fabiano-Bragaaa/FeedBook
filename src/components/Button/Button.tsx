import {ReactNode} from 'react';

import {
  Text,
  TouchableOpacityBox,
  TouchableOpacityBoxProps,
  ActivityIndicator,
  Box,
} from '@components';
import {themeColor} from '@theme';

import {buttonPresets} from './buttonPresets';

export type ButtonPreset = 'primary' | 'outline' | 'noSelected' | 'google';

interface ButtonProps extends TouchableOpacityBoxProps {
  title: string;
  loading?: boolean;
  preset?: ButtonPreset;
  disabled?: boolean;
  selected?: boolean;
  selectedColor?: themeColor;
  rightComponent?: ReactNode;
}

export function Button({
  title,
  loading,
  preset = 'primary',
  disabled,
  selected,
  selectedColor = 'primary',
  rightComponent,
  ...touchableOpacityBoxProps
}: ButtonProps) {
  const buttonPreset = buttonPresets[preset][disabled ? 'disabled' : 'default'];
  const $selectedOutline: TouchableOpacityBoxProps =
    preset === 'noSelected' && selected && !disabled
      ? {bg: selectedColor, borderWidth: 0}
      : {};

  const $selectedTextColor: themeColor | undefined =
    preset === 'noSelected' && selected && !disabled ? 'background' : undefined;

  return (
    <TouchableOpacityBox
      disabled={disabled || loading}
      paddingHorizontal="s20"
      alignItems="center"
      justifyContent={rightComponent ? 'space-between' : 'center'}
      flexDirection="row"
      height={50}
      borderRadius="s16"
      {...buttonPreset.container}
      {...$selectedOutline}
      {...touchableOpacityBoxProps}>
      {loading ? (
        <Box flex={rightComponent ? 1 : undefined}>
          <ActivityIndicator color={buttonPreset.content} />
        </Box>
      ) : (
        <Box flex={rightComponent ? 1 : undefined}>
          <Text
            textAlign={rightComponent ? 'center' : undefined}
            preset="paragraphMedium"
            bold
            color={$selectedTextColor ?? buttonPreset.content}>
            {title}
          </Text>
        </Box>
      )}

      {rightComponent && <Box ml="s16">{rightComponent}</Box>}
    </TouchableOpacityBox>
  );
}
