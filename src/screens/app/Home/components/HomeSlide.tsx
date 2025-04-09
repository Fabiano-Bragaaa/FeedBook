import {useRef} from 'react';
import {Dimensions} from 'react-native';

import Carousel, {ICarouselInstance} from 'react-native-reanimated-carousel';

import {Slider, SliderProps} from '@components';
const {width} = Dimensions.get('window');

const sliderData: SliderProps[] = [
  {bg: 'primary', title: 'Saldo Atual'},
  {bg: 'greenSuccess', title: 'Receitas'},
  {bg: 'redError', title: 'Despesas'},
];

export function HomeSlider() {
  const ref = useRef<ICarouselInstance>(null);

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
