import {useRef} from 'react';

import {useNavigation} from '@react-navigation/native';
import {SwipeableMethods} from 'react-native-gesture-handler/lib/typescript/components/ReanimatedSwipeable';

import {cashFlowService} from '../../cashFlowService';
import {useGetList} from '../queries';

export function useCashFlowList(date?: Date) {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const currentDate = date || new Date();
  const {cashList, fetchNextPage, isError, isLoading, refetch} =
    useGetList(yesterday);
  const {navigate} = useNavigation();

  const swipeableRef = useRef<SwipeableMethods | null>(null);

  async function onSwipeableOpen(
    direction: 'left' | 'right',
    current: SwipeableMethods | null,
    id: string,
  ) {
    console.log(direction);

    if (direction === 'right') {
      await cashFlowService.remove(id);
      refetch();
      console.log('deletado');
    }

    if (direction === 'left') {
      navigate('Edit', {id});
    }

    if (swipeableRef.current) {
      swipeableRef.current.close();
    }

    swipeableRef.current = current;
  }

  return {
    cashList,
    loading: isLoading,
    error: isError,
    refresh: refetch,
    fetchNextPage: fetchNextPage,
    onSwipeableOpen,
  };
}
