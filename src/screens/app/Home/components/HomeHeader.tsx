import {useAuthSignOut} from '@domain';
import {useAuthCredentials, useToastService} from '@services';

import {Box, BoxProps, Button, Icon, Text} from '@components';
import {useAppSafeArea} from '@hooks';

import {HomeSlider} from './HomeSlide';

type Props = {
  openModal: () => void;
};

export function HomeHeader({openModal}: Props) {
  const {top} = useAppSafeArea();
  const {showToast} = useToastService();

  const {userCredentials} = useAuthCredentials();

  const {isLoading, signOut} = useAuthSignOut({
    onError: message => {
      showToast({message, type: 'error'});
    },
  });
  return (
    <Box mb="s32" style={{paddingTop: top}}>
      <Box {...$wrapper}>
        <Box flexDirection="row">
          <Text preset="paragraphLarge">Olá, </Text>
          <Text preset="headingSmall">{userCredentials?.displayName}!</Text>
        </Box>
        <Button
          title="Sair do aplicativo"
          loading={isLoading}
          onPress={signOut}
        />
      </Box>
      <HomeSlider />
      <Box mt="s24">
        <Icon name="camera" size={25} onPress={openModal} />
      </Box>
    </Box>
  );
}

const $wrapper: BoxProps = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  pb: 's24',
};
