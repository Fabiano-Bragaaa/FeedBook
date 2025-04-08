import {useEffect, useState} from 'react';
import {FlatList, ListRenderItemInfo, StyleProp, ViewStyle} from 'react-native';

import {CashFlow, cashFlowService} from '@domain';

import {Box, Screen, Text} from '@components';
import {AppTabScreenProps} from '@routes';

import {HomeHeader} from './components/HomeHeader';

export function Home({navigation}: AppTabScreenProps<'Home'>) {
  const [cashList, setCashList] = useState<CashFlow[]>([]);

  useEffect(() => {
    cashFlowService.getList().then(cash => setCashList(cash));
  }, []);

  function renderItem({item}: ListRenderItemInfo<CashFlow>) {
    return (
      <Box>
        <Text>{item.text}</Text>
      </Box>
    );
  }

  return (
    <Screen style={$screen}>
      <FlatList
        data={cashList}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListHeaderComponent={<HomeHeader/>}
      />
    </Screen>
  );
}

const $screen: StyleProp<ViewStyle> = {
  paddingBottom: 0,
  paddingTop: 0,
  flex: 1,
};
