import {useRef} from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  Modal,
  RefreshControl,
  StyleProp,
  ViewStyle,
} from 'react-native';

import {CashFlow, useCashFlowList} from '@domain';
import {useScrollToTop} from '@react-navigation/native';
import Swipeable, {
  SwipeableMethods,
} from 'react-native-gesture-handler/ReanimatedSwipeable';

import {Box, CashList, Option, Screen} from '@components';
import {useAppTheme} from '@hooks';
import {AppTabScreenProps} from '@routes';

import {HomeCalendar} from './components/HomeCalendar';
import {HomeEmpty} from './components/HomeEmpty';
import {HomeHeader} from './components/HomeHeader';

export function Home({navigation}: AppTabScreenProps<'Home'>) {
  const {
    cashList,
    onSwipeableOpen,
    refresh,
    fetchNextPage,
    error,
    loading,
    setVisible,
    visible,
  } = useCashFlowList();

  const {colors} = useAppTheme();

  const flatListRef = useRef<FlatList<CashFlow>>(null);
  useScrollToTop(flatListRef);

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
        onSwipeableOpen={direction =>
          onSwipeableOpen(direction, current, item.id)
        }
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
        ref={flatListRef}
        data={cashList}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        onEndReached={fetchNextPage}
        onEndReachedThreshold={0.1}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refresh} />
        }
        refreshing={loading}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flex: cashList.length === 0 ? 1 : undefined}}
        ListHeaderComponent={<HomeHeader openModal={() => setVisible(true)} />}
        ListEmptyComponent={
          <HomeEmpty error={error} loading={loading} refetch={refresh} />
        }
      />
      <Modal visible={visible} animationType="fade" transparent>
        <HomeCalendar setVisible={() => setVisible(!visible)} />
      </Modal>
    </Screen>
  );
}

const $screen: StyleProp<ViewStyle> = {
  paddingBottom: 0,
  paddingTop: 30,
  flex: 1,
};
