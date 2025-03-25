import {Button, PasswordInput, Screen, Text, TextInput} from '@components';

export function Login() {
  function navigateToForgetMyPassword() {
    //TODO
  }

  return (
    <Screen scrollable>
      <Text preset="headingLarge">Olá!</Text>
      <Text preset="paragraphLarge" semiBold mt="s4">
        Digite seu e-mail e senha para entrar
      </Text>
      <TextInput
        label="E-mail"
        placeholder="Digite seu e-mail"
        boxProps={{mt: 's48'}}
      />
      <PasswordInput
        boxProps={{mt: 's20'}}
        label="Senha"
        placeholder="Digite sua senha"
      />
      <Text
        onPress={navigateToForgetMyPassword}
        preset="paragraphSmall"
        color="primary"
        mt="s10"
        bold>
        Esqueci minha senha
      </Text>
      <Button title="Entrar" mt="s48" />
      <Button title="Criar uma conta" mt="s14" preset="outline" />
    </Screen>
  );
}
