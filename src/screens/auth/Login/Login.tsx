import {useAuthSignIn} from '@domain';
import {zodResolver} from '@hookform/resolvers/zod';
import {useToastService} from '@services';
import {useForm} from 'react-hook-form';

import {
  Button,
  FormPasswordTextInput,
  FormTextInput,
  Screen,
  Text,
} from '@components';
import {AuthScreenProps} from '@routes';

import {loginSchema, TypeLoginSchema} from './LoginSchema';

export function Login({navigation}: AuthScreenProps<'Login'>) {
  const {showToast} = useToastService();

  const {isLoading, signIn} = useAuthSignIn({
    onError: (message) => {
      showToast({message, type: 'error'});
    },
  });

  const {control, formState, handleSubmit} = useForm<TypeLoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  function navigateToForgetMyPassword() {
    navigation.navigate('ForgetPassword');
  }

  function submitForm(props: TypeLoginSchema) {
    signIn(props);
  }

  function navigateToLogin() {
    navigation.navigate('SignUp');
  }

  return (
    <Screen scrollable>
      <Text preset="headingLarge">Olá!</Text>
      <Text preset="paragraphLarge" semiBold mt="s4">
        Digite seu e-mail e senha para entrar
      </Text>
      <FormTextInput
        control={control}
        name="email"
        label="E-mail"
        placeholder="Digite seu e-mail"
        boxProps={{mt: 's48'}}
      />
      <FormPasswordTextInput
        control={control}
        name="password"
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
      <Button
        loading={isLoading}
        title="Entrar"
        mt="s48"
        disabled={!formState.isValid}
        onPress={handleSubmit(submitForm)}
      />
      <Button
        title="Criar uma conta"
        mt="s14"
        preset="outline"
        onPress={navigateToLogin}
      />
    </Screen>
  );
}
