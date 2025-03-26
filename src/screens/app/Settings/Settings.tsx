import {Screen, Text} from '@components';
import {AppScreenProps} from '@routes';

export function Settings({}: AppScreenProps<'Settings'>) {
  return (
    <Screen canGoBack>
      <Text>Settings</Text>
    </Screen>
  );
}
