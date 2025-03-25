import {Button, PasswordInput, Screen, Text, TextInput} from '@components';

export function SignUp() {
  return (
    <Screen scrollable>
      <Text preset="headingLarge">Criar uma conta</Text>
      <TextInput
        label="Nome completo"
        placeholder="Digite seu nome completo"
        boxProps={{mt: 's32'}}
      />

      <TextInput
        label="E-mail"
        placeholder="Digite seu e-mail"
        boxProps={{mt: 's20'}}
      />

      <PasswordInput
        boxProps={{mt: 's20'}}
        label="Senha"
        placeholder="Digite sua senha"
      />
      <PasswordInput
        boxProps={{mt: 's20'}}
        label="Confirmar senha"
        placeholder="Digite novamente sua senha"
      />
      <Button title="Criar minha conta" mt="s48" />
    </Screen>
  );
}
