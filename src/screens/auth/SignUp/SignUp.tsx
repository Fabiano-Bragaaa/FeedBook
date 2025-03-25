import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {Button, PasswordInput, Screen, Text, TextInput} from '@components';
import {useResetNavigationSuccess} from '@hooks';
import {RootStackParamList} from '@routes';

type ScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

export function SignUp({navigation}: ScreenProps) {
  const asd;
  const {reset} = useResetNavigationSuccess();
  function submitForm() {
    reset({
      title: 'Sua conta foi criada com sucesso!',
      description: 'Agora é só fazer login na nossa plataforma',
      icon: {
        name: 'checkRound',
        size: 60,
        color: 'success',
      },
    });
  }

  return (
    <Screen scrollable canGoBack>
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
      <Button title="Criar minha conta" mt="s48" onPress={submitForm} />
    </Screen>
  );
}
