import {DateData} from 'react-native-calendars';
import {create} from 'zustand';

type DateStore = {
  day?: DateData;
  setDay: (day: DateData) => void;
  clearDay: () => void;
};

export function useDay():DateStore{
  return useDayZustand();
}

const useDayZustand = create<DateStore>(set => ({
  day: undefined,
  setDay: day => set({day}),
  clearDay: () => set({day: undefined}),
}));
