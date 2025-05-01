import {
  ActivityIndicatorProps,
  ActivityIndicator as RNActivityIndicator,
} from 'react-native';

import {useAppTheme} from '@hooks';
import {themeColor} from '@theme';

type Props = Omit<ActivityIndicatorProps, 'colors'> & {
  color?: themeColor;
};

export function ActivityIndicator({color = 'primary'}: Props) {
  const {colors} = useAppTheme();
  return <RNActivityIndicator color={colors[color]} />;
}
