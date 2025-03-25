import {ReactNode, useRef} from 'react';
import {
  Pressable,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  TextStyle,
} from 'react-native';

import {Box, BoxProps} from '@components';
import {useAppTheme} from '@hooks';

import {$fontFamily, $fontSizes, Text} from '../Text/Text';

export type TextInputProps = RNTextInputProps & {
  label: string;
  errorMessage?: string;
  rightComponent?: ReactNode;
  boxProps?: BoxProps;
};

export function TextInput({
  label,
  errorMessage,
  rightComponent,
  boxProps,
  ...rnTextInputProps
}: TextInputProps) {
  const {colors} = useAppTheme();

  const inputRef = useRef<RNTextInput>(null);

  function focusInput() {
    inputRef.current?.focus();
  }

  const $textInputContainer: BoxProps = {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: errorMessage ? 2 : 1,
    borderColor: errorMessage ? 'error' : 'gray4',
    borderRadius: 's12',
    p: 's12',
  };

  return (
    <Box {...boxProps}>
      <Pressable onPress={focusInput}>
        <Box>
          <Text mb="s4" preset="paragraphMedium" semiBold>
            {label}
          </Text>
          <Box {...$textInputContainer}>
            <RNTextInput
              autoCapitalize="none"
              ref={inputRef}
              placeholderTextColor={colors.gray2}
              {...rnTextInputProps}
              style={$textInputStyle}
            />
            {rightComponent && (
              <Box justifyContent="center" ml="s16">
                {rightComponent}
              </Box>
            )}
          </Box>
          {errorMessage && (
            <Text preset="paragraphSmall" bold color="error">
              {errorMessage}
            </Text>
          )}
        </Box>
      </Pressable>
    </Box>
  );
}

const $textInputStyle: TextStyle = {
  padding: 0,
  fontFamily: $fontFamily.regular,
  ...$fontSizes.paragraphMedium,
  flexGrow: 1,
  flexShrink: 1,
};
