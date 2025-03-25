import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {Button, Screen, Text, TextInput} from '@components';
import {useResetNavigationSuccess} from '@hooks';
import {RootStackParamList} from '@routes';

type ScreenProps = NativeStackScreenProps<RootStackParamList, 'ForgetPassword'>;

export function ForgetPassword({navigation}: ScreenProps) {
  const {reset} = useResetNavigationSuccess();
  function submitForm() {
    reset({
      title: 'Enviamos as intruções para seu e-mail',
      description:
        'Clique no link enviado no seu e-mail para recuperar a senha',
      icon: {
        name: 'messageRound',
        color: 'success',
        size: 60,
      },
    });
  }
  return (
    <Screen canGoBack>
      <Text preset="headingLarge" mb="s14">
        Esqueci minha senha
      </Text>
      <Text preset="paragraphLarge">
        Digite seu e-mail e enviaremos as instruções para redefinição de senha
      </Text>
      <TextInput
        label="E-mail"
        placeholder="Digite seu e-mail"
        boxProps={{mt: 's24'}}
      />
      <Button title="Recuperar senha" mt="s48" onPress={submitForm} />
    </Screen>
  );
}
