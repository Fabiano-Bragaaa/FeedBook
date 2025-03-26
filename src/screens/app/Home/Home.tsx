import {Button, Screen, Text} from '@components';
import {AppTabScreenProps} from '@routes';

export function Home({navigation}: AppTabScreenProps<'Home'>) {
  return (
    <Screen>
      <Text>Home</Text>
      <Button
        title="Ir para settings"
        mt="s10"
        onPress={() => navigation.navigate('Settings')}
      />
    </Screen>
  );
}
