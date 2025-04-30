import {useCallback, useRef, useState} from 'react';

import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useToast, useToastService} from '@services';
import {DocumentData, QueryDocumentSnapshot} from 'firebase/firestore';
import {SwipeableMethods} from 'react-native-gesture-handler/lib/typescript/components/ReanimatedSwipeable';

import {cashFlowService} from '../../cashFlowService';
import {CashFlow} from '../../cashFlowTypes';
import {useCashFlowRemove} from '../mutations/useCashFlowRemove';

export function useCashFlowList() {
  const [cashList, setCashList] = useState<CashFlow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean | null>(null);
  const [lastVisible, setLastVisible] =
    useState<QueryDocumentSnapshot<DocumentData>>();
  const [hasNextPage, setHasNextPage] = useState(true);

  const {showToast} = useToastService();

  const {mutate} = useCashFlowRemove({
    onSuccess: () => {
      showToast({
        message: 'Movimentação deletada',
        duration: 5000,
      });
    },
    onError: () => {
      showToast({message: 'Erro ao deletar movimentação'});
    },
  });

  const {navigate} = useNavigation();

  const swipeableRef = useRef<SwipeableMethods | null>(null);

  async function fetchInitialData() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    try {
      setLoading(true);
      setError(false);
      const response = await cashFlowService.getList();
      setCashList(response.data);
      setLastVisible(response.lastVisible);
      setHasNextPage(response.hasNextPage);
    } catch (err) {
      setError(true);
      console.log('erro ao iniciar os dados', err);
    } finally {
      setLoading(false);
    }
  }

  async function fetchNextPage() {
    if (!hasNextPage || loading) {
      return;
    }

    try {
      setLoading(true);
      const response = await cashFlowService.getList(lastVisible);
      setCashList(prev => [...prev, ...response.data]);
      setLastVisible(response.lastVisible);
      setHasNextPage(response.hasNextPage);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchInitialData();
    }, []),
  );

  async function onSwipeableOpen(
    direction: 'left' | 'right',
    current: SwipeableMethods | null,
    id: string,
  ) {
    console.log(direction);

    if (direction === 'right') {
      await mutate({id});
      fetchInitialData();
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
    loading,
    error,
    refresh: fetchInitialData,
    fetchNextPage,
    onSwipeableOpen,
  };
}
