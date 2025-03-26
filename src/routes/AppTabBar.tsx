import {ViewStyle} from 'react-native';

import {BottomTabBarProps} from '@react-navigation/bottom-tabs';

import {
  Box,
  BoxProps,
  Icon,
  TouchableOpacityBox,
  TouchableOpacityBoxProps,
} from '@components';
import {useAppSafeArea} from '@hooks';
import {$shadowProps} from '@theme';

import {AppTabBottomTabParamList} from './AppTabNavigator';
import {mapScreenToProps} from './mapScreenToProps';

export function AppTabBar({state, descriptors, navigation}: BottomTabBarProps) {
  const {bottom} = useAppSafeArea();
  return (
    <Box {...$boxWrapper} style={[{paddingBottom: bottom}, $shadowProps]}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];

        const tabItem =
          mapScreenToProps[route.name as keyof AppTabBottomTabParamList];

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacityBox
            key={route.key}
            {...$itemWrapper}
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}>
            <Icon
              color={isFocused ? 'primary' : 'backgroundContranst'}
              name={isFocused ? tabItem.icon.focused : tabItem.icon.unfocused}
              onPress={onPress}
            />
          </TouchableOpacityBox>
        );
      })}
    </Box>
  );
}

const $boxWrapper: BoxProps = {
  pt: 's12',
  backgroundColor: 'background',
  flexDirection: 'row',
};

const $itemWrapper: TouchableOpacityBoxProps = {
  activeOpacity: 1,
  alignItems: 'center',
  flex: 1,
  accessibilityRole: 'button',
};
