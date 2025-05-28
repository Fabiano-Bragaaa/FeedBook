import {useEffect, useMemo, useState} from 'react';

import {DateData} from 'react-native-calendars';

import {useAppTheme} from '@hooks';

import {useGetTransactionDates} from '../queries';

type Props = {
  setVisible: () => void;
  setDate: (day: Date) => void;
};

export function useCashFlowDate({setDate, setVisible}: Props) {
  const {data, isLoading} = useGetTransactionDates();

  const [day, setDay] = useState<DateData>();
  const [markedDates, setMarkedDates] = useState<string[]>([]);
  const {colors} = useAppTheme();

  console.log('dia', day);

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
    day,
  };
}
