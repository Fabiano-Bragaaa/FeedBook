import {Box, BoxProps, Button, Text} from '@components';
import {useAppSafeArea} from '@hooks';

import {HomeSlider} from './HomeSlide';

export function HomeHeader() {
  const {top} = useAppSafeArea();
  return (
    <Box style={{paddingTop: top}}>
      <Box {...$wrapper}>
        <Box flexDirection="row">
          <Text preset="paragraphLarge">Olá, </Text>
          <Text preset="headingSmall">Fabiano!</Text>
        </Box>
        <Button title="Sair do aplicativo" />
      </Box>
      <HomeSlider />
    </Box>
  );
}

const $wrapper: BoxProps = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  pb: 's24',
};
