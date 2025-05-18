import {useAuthSignOut} from '@domain';

import {Box, BoxProps, Button, Text} from '@components';
import {useAppSafeArea} from '@hooks';

import {HomeSlider} from './HomeSlide';

export function HomeHeader() {
  const {top} = useAppSafeArea();

  const {isLoading, signOut} = useAuthSignOut();
  return (
    <Box mb="s32" style={{paddingTop: top}}>
      <Box {...$wrapper}>
        <Box flexDirection="row">
          <Text preset="paragraphLarge">Olá, </Text>
          <Text preset="headingSmall">Fabiano!</Text>
        </Box>
        <Button
          title="Sair do aplicativo"
          loading={isLoading}
          onPress={signOut}
        />
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
