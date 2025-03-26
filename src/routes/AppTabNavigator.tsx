import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import {Home, New, Profile} from '@screens';

import {AppTabBar} from './AppTabBar';

export type AppTabBottomTabParamList = {
  Home: undefined;
  New: undefined;
  Profile: undefined;
};

const {Navigator, Screen} =
  createBottomTabNavigator<AppTabBottomTabParamList>();

export function AppTabNavigator() {
  function renderTabBar(props: BottomTabBarProps) {
    return <AppTabBar {...props} />;
  }

  return (
    <Navigator tabBar={renderTabBar} screenOptions={{headerShown: false}}>
      <Screen name="Home" component={Home} />
      <Screen name="New" component={New} />
      <Screen name="Profile" component={Profile} />
    </Navigator>
  );
}
