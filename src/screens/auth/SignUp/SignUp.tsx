import {useAuthSignUp} from '@domain';
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
import {useResetNavigationSuccess} from '@hooks';
import {AuthScreenProps, AuthStackParamList} from '@routes';

import {signUpSchema, TypeSignUpSchema} from './SignUpSchema';

const resetParams: AuthStackParamList['Success'] = {
  title: 'Sua conta foi criada com sucesso!',
  description: 'Agora é só fazer login na nossa plataforma',
  icon: {
    name: 'checkRound',
    size: 60,
    color: 'success',
  },
};

export function SignUp({navigation}: AuthScreenProps<'SignUp'>) {
  const {showToast} = useToastService();
  const {reset} = useResetNavigationSuccess();
  const {isLoading, signUp} = useAuthSignUp({
    onSuccess: () => {
      reset(resetParams);
    },
    onError: message => {
      showToast({message, type: 'error'});
    },
  });

  const {control, formState, handleSubmit} = useForm<TypeSignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
    mode: 'onChange',
  });

  function submitForm({email, password, fullName}: TypeSignUpSchema) {
    signUp({email, password, displayName: fullName});
  }

  return (
    <Screen scrollable canGoBack>
      <Text preset="headingLarge">Criar uma conta</Text>
      <FormTextInput
        control={control}
        name="fullName"
        label="Nome completo"
        placeholder="Digite seu nome completo"
        boxProps={{mt: 's32'}}
        autoCapitalize="words"
      />
      <FormTextInput
        control={control}
        name="email"
        label="E-mail"
        placeholder="Digite seu e-mail"
        boxProps={{mt: 's20'}}
      />

      <FormPasswordTextInput
        control={control}
        name="password"
        boxProps={{mt: 's20'}}
        label="Senha"
        placeholder="Digite sua senha"
      />

      <FormPasswordTextInput
        control={control}
        name="passwordConfirm"
        boxProps={{mt: 's20'}}
        label="Confirmar senha"
        placeholder="Digite novamente sua senha"
      />

      <Button
        loading={isLoading}
        disabled={!formState.isValid}
        title="Criar minha conta"
        mt="s48"
        onPress={handleSubmit(submitForm)}
      />
    </Screen>
  );
}
