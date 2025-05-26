import {Dimensions} from 'react-native';

import {formatCurrency} from '@utils';

import {Box, BoxProps, Text} from '@components';
import {themeColor} from '@theme';

const {width} = Dimensions.get('window');

export type SliderProps = {
  bg: themeColor;
  title: string;
  amount: number;
};

export function Slider({bg, title, amount}: SliderProps) {
  const $wrapper: BoxProps = {
    height: 140,
    bg,
    justifyContent: 'center',
    p: 's16',
    gap: 's14',
    borderRadius: 's16',
    width: width * 0.85,
  };

  return (
    <Box {...$wrapper}>
      <Text preset="headingSmall" color="backgroundContranst">
        {title}
      </Text>
      <Text preset="headingMedium" color="backgroundContranst">
        {formatCurrency(amount)}
      </Text>
    </Box>
  );
}
