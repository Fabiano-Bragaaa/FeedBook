import {IconProps} from '@components';

import {AppTabBottomTabParamList} from './AppTabNavigator';

export const mapScreenToProps: Record<
  keyof AppTabBottomTabParamList,
  {
    icon: {
      focused: IconProps['name'];
      unfocused: IconProps['name'];
    };
  }
> = {
  Home: {
    icon: {
      focused: 'homeFill',
      unfocused: 'home',
    },
  },
  New: {
    icon: {
      focused: 'newPost',
      unfocused: 'newPost',
    },
  },
  Profile: {
    icon: {
      focused: 'profileFill',
      unfocused: 'profile',
    },
  },
};
