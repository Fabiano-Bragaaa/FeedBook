import {Button, Screen, Text} from '@components';
import {AppTabScreenProps} from '@routes';

export function Profile({navigation}: AppTabScreenProps<'Profile'>) {
  return (
    <Screen>
      <Text>Profile</Text>
      <Button
        title="Ir para settings"
        mt="s10"
        onPress={() => navigation.navigate('Settings')}
      />
    </Screen>
  );
}
