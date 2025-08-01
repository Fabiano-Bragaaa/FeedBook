import {useEffect, useMemo, useState} from 'react';

import {useDay} from '@services';
import {convertToUtc} from '@utils';
import {format} from 'date-fns';

import {useAppTheme} from '@hooks';

import {useGetTransactionDates} from '../queries';

type Props = {
  setVisible: () => void;
  setDate: (day: Date) => void;
};

export function useCashFlowDate({setDate, setVisible}: Props) {
  const {data, isLoading} = useGetTransactionDates();

  const today = convertToUtc(new Date(), 'America/Sao_Paulo');
  const currentDate = format(today, 'yyyy-MM-dd');

  const {day, setDay} = useDay();
  const [markedDates, setMarkedDates] = useState<string[]>([]);

  console.log('dias marcados ===>', markedDates);

  const {colors} = useAppTheme();

  useEffect(() => {
    if (!data) {
      return;
    }

    setMarkedDates(data);
  }, [data]);

  const marked = useMemo(() => {
    const result: Record<string, any> = {};

    markedDates.forEach(date => {
      result[date] = {
        marked: true,
        dotColor: colors.primary,
      };
    });

    if (day) {
      const selectedDate = result[day.dateString] || {};
      result[day.dateString] = {
        ...selectedDate,
        selected: true,
        selectedColor: colors.background,
        selectedTextColor: colors.backgroundContranst,
      };
    }

    return result;
  }, [
    markedDates,
    day,
    colors.primary,
    colors.backgroundContranst,
    colors.background,
  ]);

  function handleFilterDate() {
    if (day) {
      setDate(new Date(day.dateString));
      setVisible();
    }
  }

  return {
    isLoading,
    marked,
    setDay,
    handleFilterDate,
    currentDate,
  };
}
