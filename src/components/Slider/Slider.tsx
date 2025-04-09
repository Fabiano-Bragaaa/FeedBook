import {Dimensions} from 'react-native';

import {Box, BoxProps, Text} from '@components';
import {themeColor} from '@theme';

const {width} = Dimensions.get('window');

export type SliderProps = {
  bg: themeColor;
  title: string;
};

export function Slider({bg, title}: SliderProps) {
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
      <Text preset="headingSmall" color="background">
        {title}
      </Text>
      <Text preset="headingMedium" color="background">
        ola
      </Text>
    </Box>
  );
}
