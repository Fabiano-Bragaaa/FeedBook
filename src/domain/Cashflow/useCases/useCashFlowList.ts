import {useEffect, useRef, useState} from 'react';

import {SwipeableMethods} from 'react-native-gesture-handler/lib/typescript/components/ReanimatedSwipeable';

import {cashFlowService} from '../cashFlowService';
import {CashFlow} from '../cashFlowTypes';

export function useCashFlowList() {
  const [cashList, setCashList] = useState<CashFlow[]>([]);

  const swipeableRef = useRef<SwipeableMethods | null>(null);

  useEffect(() => {
    cashFlowService.getList().then(cash => setCashList(cash));
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
    onSwipeableOpen,
  };
}
