import {useEffect, useMemo, useState} from 'react';
import {
  Dimensions,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import {
  cashFlowService,
  useCashFlowDate,
  useGetTransactionDates,
} from '@domain';
import {ptBR} from '@utils';
import {Calendar, DateData, LocaleConfig} from 'react-native-calendars';

import {ActivityIndicator, Box, Button} from '@components';
import {useAppTheme} from '@hooks';

LocaleConfig.locales['pt-br'] = ptBR;

LocaleConfig.defaultLocale = 'pt-br';

const {height} = Dimensions.get('window');

type Props = {
  setVisible: () => void;
  setDate: (day: Date) => void;
};

export function HomeCalendar({setVisible, setDate}: Props) {
  const {handleFilterDate, isLoading, marked, setDay} = useCashFlowDate({
    setVisible,
    setDate,
  });

  const {colors} = useAppTheme();

  if (isLoading) {
    return (
      <Box flex={1} alignItems="center" justifyContent="center">
        <ActivityIndicator size={20} />
      </Box>
    );
  }

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
        <Button title="Selecionar" mb="s20" onPress={handleFilterDate} />
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
