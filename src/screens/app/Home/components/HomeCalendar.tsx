import {useEffect, useMemo, useState} from 'react';
import {
  Dimensions,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import {cashFlowService} from '@domain';
import {ptBR} from '@utils';
import {Calendar, DateData, LocaleConfig} from 'react-native-calendars';

import {Box, Button} from '@components';
import {useAppTheme} from '@hooks';

LocaleConfig.locales['pt-br'] = ptBR;

LocaleConfig.defaultLocale = 'pt-br';

const {height} = Dimensions.get('window');

type Props = {
  setVisible: () => void;
};

export function HomeCalendar({setVisible}: Props) {
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

  return (
    <View style={{flex: 1, justifyContent: 'flex-end'}}>
      <TouchableOpacity
        style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.6)'}}
        onPress={setVisible}
      />
      <Box
        justifyContent="center"
        bg="backgroundContranst"
        borderTopLeftRadius="s12"
        borderTopRightRadius="s12"
        paddingHorizontal="s14"
        gap="s16"
        minHeight={height * 0.45}>
        <Calendar
          style={$calendar}
          headerStyle={$headerCalendar}
          theme={{
            textMonthFontSize: 18,
            monthTextColor: colors.background,
            todayTextColor: colors.primary,
            arrowColor: colors.background,
            calendarBackground: 'transparent',
          }}
          onDayPress={setDay}
          hideExtraDays
          markedDates={marked}
        />
        <Button title="Selecionar" mb="s20" />
      </Box>
    </View>
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
