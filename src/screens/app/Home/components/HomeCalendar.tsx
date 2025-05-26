import {useState} from 'react';
import {StyleProp, ViewStyle} from 'react-native';

import {ptBR} from '@utils';
import {Calendar, DateData, LocaleConfig} from 'react-native-calendars';

import {useAppTheme} from '@hooks';

LocaleConfig.locales['pt-br'] = ptBR;

LocaleConfig.defaultLocale = 'pt-br';

export function HomeCalendar() {
  const [day, setDay] = useState<DateData>();
  const {colors} = useAppTheme();
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
      markedDates={
        day && {
          [day.dateString]: {selected: true},
        }
      }
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
