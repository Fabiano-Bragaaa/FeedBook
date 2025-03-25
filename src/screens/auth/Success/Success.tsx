import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {Button, Icon, Screen, Text} from '@components';
import {RootStackParamList} from '@routes';

type ScreenProps = NativeStackScreenProps<RootStackParamList, 'Success'>;

export function Success({route, navigation}: ScreenProps) {
  return (
    <Screen>
      <Icon {...route.params.icon} />
      <Text preset="headingLarge" mt="s24">
        {route.params.title}
      </Text>
      <Text preset="paragraphLarge" mt="s16">
        {route.params.description}
      </Text>
      <Button title="Voltar ao inicio" mt="s40" onPress={navigation.goBack} />
    </Screen>
  );
}
