import {FlatList, ListRenderItemInfo, StyleProp, ViewStyle} from 'react-native';

import {CashFlow, useCashFlowList} from '@domain';
import Swipeable, {
  SwipeableMethods,
} from 'react-native-gesture-handler/ReanimatedSwipeable';

import {Box, CashList, Option, Screen} from '@components';
import {useAppTheme} from '@hooks';
import {AppTabScreenProps} from '@routes';

import {HomeHeader} from './components/HomeHeader';

export function Home({navigation}: AppTabScreenProps<'Home'>) {
  const {cashList, onSwipeableOpen} = useCashFlowList();
  const {colors} = useAppTheme();

  function renderItem({item}: ListRenderItemInfo<CashFlow>) {
    let current: SwipeableMethods | null = null;
    return (
      <Swipeable
        ref={swipeable => (current = swipeable)}
        containerStyle={{
          backgroundColor: colors.background,
        }}
        overshootRight={false}
        overshootLeft={false}
        friction={2}
        rightThreshold={70}
        leftThreshold={70}
        onSwipeableOpen={direction => onSwipeableOpen(direction, current)}
        renderLeftActions={() => (
          <Box bg="redError" flex={1} height={50} borderRadius="s12">
            <Option icon={{name: 'trash', color: 'background'}} bg="redError" />
          </Box>
        )}
        renderRightActions={() => (
          <Box
            bg="greenSuccess"
            flex={1}
            height={50}
            alignItems="flex-end"
            borderRadius="s12">
            <Option
              icon={{name: 'pencil', color: 'background'}}
              bg="greenSuccess"
            />
          </Box>
        )}>
        <CashList item={item} />
      </Swipeable>
    );
  }

  return (
    <Screen style={$screen}>
      <FlatList
        data={cashList}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<HomeHeader />}
      />
    </Screen>
  );
}

const $screen: StyleProp<ViewStyle> = {
  paddingBottom: 0,
  paddingTop: 0,
  flex: 1,
};
