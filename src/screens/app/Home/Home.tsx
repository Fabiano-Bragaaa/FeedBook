import {StyleProp, ViewStyle} from 'react-native';

import {Screen} from '@components';
import {AppTabScreenProps} from '@routes';

import {HomeHeader} from './components/HomeHeader';

export function Home({navigation}: AppTabScreenProps<'Home'>) {
  return (
    <Screen style={$screen}>
      <HomeHeader />
    </Screen>
  );
}

const $screen: StyleProp<ViewStyle> = {
  paddingBottom: 0,
  paddingTop: 0,
  flex: 1,
};
