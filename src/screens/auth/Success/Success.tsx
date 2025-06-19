import {Button, Icon, Screen, Text} from '@components';
import {AuthScreenProps} from '@routes';

export function Success({route, navigation}: AuthScreenProps<'Success'>) {
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
