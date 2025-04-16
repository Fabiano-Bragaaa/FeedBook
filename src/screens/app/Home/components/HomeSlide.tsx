import {useRef} from 'react';
import {Dimensions} from 'react-native';

import {useCashFlowCardHeader} from '@domain';
import Carousel, {ICarouselInstance} from 'react-native-reanimated-carousel';

import {Slider, SliderProps} from '@components';
const {width} = Dimensions.get('window');

export function HomeSlider() {
  const ref = useRef<ICarouselInstance>(null);
  const {balance, expense, income} = useCashFlowCardHeader();

  const sliderData: SliderProps[] = [
    {bg: 'primary', title: 'Saldo Atual', amount: balance},
    {bg: 'greenSuccess', title: 'Receitas', amount: income},
    {bg: 'redError', title: 'Despesas', amount: expense},
  ];

  return (
    <Carousel
      ref={ref}
      loop={false}
      width={width * 1}
      height={140}
      data={sliderData}
      style={{alignSelf: 'flex-start'}}
      pagingEnabled
      mode="horizontal-stack"
      modeConfig={{
        snapDirection: 'left',
        stackInterval: 18,
      }}
      renderItem={({item}) => <Slider {...item} />}
    />
  );
}
