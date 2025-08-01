import {Image} from 'react-native';

import {useAuthGoogleSignIn, useAuthSignIn} from '@domain';
import {zodResolver} from '@hookform/resolvers/zod';
import {google} from '@images';
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

import {Row} from './components/Row/Row';
import {loginSchema, TypeLoginSchema} from './LoginSchema';

export function Login({navigation}: AuthScreenProps<'Login'>) {
  const {showToast} = useToastService();
  const authGoogle = useAuthGoogleSignIn({
    onError: message => {
      showToast({message, type: 'error'});
    },
  });

  const authForm = useAuthSignIn({
    onError: message => {
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

  function signInWithGoogle() {
    authGoogle.signInWithGoogle();
  }

  function navigateToForgetMyPassword() {
    navigation.navigate('ForgetPassword');
  }

  function submitForm(props: TypeLoginSchema) {
    authForm.signIn(props);
  }

  function navigateToSignUp() {
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
        loading={authForm.isLoading}
        title="Entrar"
        mt="s48"
        disabled={!formState.isValid}
        onPress={handleSubmit(submitForm)}
      />
      <Row />

      <Button title="Criar uma conta" mb="s40" onPress={navigateToSignUp} />
      <Button
        preset="google"
        loading={authGoogle.isLoading}
        title="Entrar com o google"
        onPress={signInWithGoogle}
        rightComponent={
          <Image
            source={google}
            style={{width: 20, height: 20}}
            resizeMode="contain"
          />
        }
        mt="s14"
      />
    </Screen>
  );
}
