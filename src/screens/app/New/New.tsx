import {Button, Screen, Text} from '@components';
import {AppTabScreenProps} from '@routes';

export function New({navigation}: AppTabScreenProps<'New'>) {
  return (
    <Screen>
      <Text>New</Text>
      <Button
        title="Ir para settings"
        mt="s10"
        onPress={() => navigation.navigate('Settings')}
      />
    </Screen>
  );
}
