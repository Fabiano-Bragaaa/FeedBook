import {useEffect, useMemo, useState} from 'react';
import {StyleProp, ViewStyle} from 'react-native';

import {cashFlowService} from '@domain';
import {ptBR} from '@utils';
import {Calendar, DateData, LocaleConfig} from 'react-native-calendars';

import {useAppTheme} from '@hooks';

LocaleConfig.locales['pt-br'] = ptBR;

LocaleConfig.defaultLocale = 'pt-br';

export function HomeCalendar() {
  const [day, setDay] = useState<DateData>();
  const [markedDates, setMarkedDates] = useState<string[]>([]);
  const {colors} = useAppTheme();

  useEffect(() => {
    async function loadMarkedDates() {
      const dates = await cashFlowService.getTransactionDates();
      setMarkedDates(dates);
    }

    loadMarkedDates();
  }, []);

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
        selectedColor: colors.backgroundContranst,
        selectedTextColor: colors.background,
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

  return (
    <Calendar
      style={$calendar}
      headerStyle={$headerCalendar}
      theme={{
        textMonthFontSize: 18,
        monthTextColor: colors.backgroundContranst,
        todayTextColor: colors.primary,
        selectedDayBackgroundColor: colors.backgroundContranst,
        selectedDayTextColor: colors.background,
        arrowColor: colors.backgroundContranst,
        calendarBackground: 'transparent',
        textDayStyle: {color: colors.backgroundContranst},
      }}
      onDayPress={setDay}
      hideExtraDays
      markedDates={marked}
    />
  );
}

const $calendar: StyleProp<ViewStyle> = {
  backgroundColor: 'transparent',
};

const $headerCalendar: StyleProp<ViewStyle> = {
  borderBottomWidth: 0.5,
  borderBottomColor: '#e8e8e8',
  paddingBottom: 10,
  marginBottom: 10,
};
