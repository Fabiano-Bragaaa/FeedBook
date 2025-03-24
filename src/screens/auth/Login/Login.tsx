import {Button, Icon, Screen, Text, TextInput} from '@components';

export function Login() {
  return (
    <Screen canGoBack>
      <Text preset="headingLarge">Ola</Text>
      <Button title="entrar" disabled />
      <Icon name="bookmark" />
      <TextInput
        label="E-mail"
        errorMessage="erro de mais"
        rightComponent={<Icon name={'eyeOn'} />}
      />
    </Screen>
  );
}
