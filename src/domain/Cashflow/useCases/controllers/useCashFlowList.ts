import {useRef, useState} from 'react';

import {useNavigation} from '@react-navigation/native';
import {SwipeableMethods} from 'react-native-gesture-handler/lib/typescript/components/ReanimatedSwipeable';

import {useCashFlowRemove} from '../mutations/useCashFlowRemove';
import {useGetList} from '../queries';

export function useCashFlowList() {
  const [date, setDate] = useState<Date>();
  console.log('data no meu useCashFlow --->', date);

  const [visible, setVisible] = useState<boolean>(false);
  const currentDate = date || new Date();
  const {cashList, fetchNextPage, isError, isLoading, refetch, isFetching} =
    useGetList(currentDate);
  const {mutate} = useCashFlowRemove({
    onSuccess: () => {
      refetch();
    },
  });
  const {navigate} = useNavigation();

  const swipeableRef = useRef<SwipeableMethods | null>(null);

  async function onSwipeableOpen(
    direction: 'left' | 'right',
    current: SwipeableMethods | null,
    id: string,
  ) {
    console.log(direction);

    if (direction === 'right') {
      mutate({
        id,
      });
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
    loading: isLoading || isFetching,
    error: isError,
    refresh: refetch,
    fetchNextPage: fetchNextPage,
    onSwipeableOpen,
    visible,
    setVisible,
    setDate,
  };
}
