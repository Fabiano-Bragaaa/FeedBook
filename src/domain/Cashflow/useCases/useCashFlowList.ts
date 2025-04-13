import {useEffect, useRef, useState} from 'react';

import {DocumentData, QueryDocumentSnapshot} from 'firebase/firestore';
import {SwipeableMethods} from 'react-native-gesture-handler/lib/typescript/components/ReanimatedSwipeable';

import {cashFlowService} from '../cashFlowService';
import {CashFlow} from '../cashFlowTypes';

export function useCashFlowList() {
  const [cashList, setCashList] = useState<CashFlow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean | null>(null);
  const [lastVisible, setLastVisible] =
    useState<QueryDocumentSnapshot<DocumentData>>();
  const [hasNextPage, setHasNextPage] = useState(true);

  const swipeableRef = useRef<SwipeableMethods | null>(null);

  async function fetchInitialData() {
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

  useEffect(() => {
    fetchInitialData();
  }, []);

  function onSwipeableOpen(
    direction: 'left' | 'right',
    current: SwipeableMethods | null,
  ) {
    console.log(direction);

    if (direction === 'right') {
      console.log('deletado');
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
