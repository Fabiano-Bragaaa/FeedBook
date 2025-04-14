import {
  Text,
  TouchableOpacityBox,
  TouchableOpacityBoxProps,
  ActivityIndicator,
} from '@components';
import {themeColor} from '@theme';

import {buttonPresets} from './buttonPresets';

export type ButtonPreset = 'primary' | 'outline' | 'noSelected';

interface ButtonProps extends TouchableOpacityBoxProps {
  title: string;
  loading?: boolean;
  preset?: ButtonPreset;
  disabled?: boolean;
  selected?: boolean;
  selectedColor?: themeColor;
}

export function Button({
  title,
  loading,
  preset = 'primary',
  disabled,
  selected,
  selectedColor = 'primary',
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
      justifyContent="center"
      height={50}
      borderRadius="s16"
      {...buttonPreset.container}
      {...$selectedOutline}
      {...touchableOpacityBoxProps}>
      {loading ? (
        <ActivityIndicator color={buttonPreset.content} />
      ) : (
        <Text
          preset="paragraphMedium"
          bold
          color={$selectedTextColor ?? buttonPreset.content}>
          {title}
        </Text>
      )}
    </TouchableOpacityBox>
  );
}
