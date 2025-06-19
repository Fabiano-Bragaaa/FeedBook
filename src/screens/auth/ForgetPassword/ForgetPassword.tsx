import {useAuthForgoutPassword} from '@domain';
import {zodResolver} from '@hookform/resolvers/zod';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useForm} from 'react-hook-form';

import {Button, FormTextInput, Screen, Text} from '@components';
import {useResetNavigationSuccess} from '@hooks';
import {AuthScreenProps, AuthStackParamList} from '@routes';

import {
  forgetPasswordSchema,
  TypeForgetPasswordSchema,
} from './ForgetPasswordSchema';

const resetParams: AuthStackParamList['Success'] = {
  title: 'Enviamos as intruções para seu e-mail',
  description: 'Clique no link enviado no seu e-mail para recuperar a senha',
  icon: {
    name: 'messageRound',
    color: 'success',
    size: 60,
  },
};

export function ForgetPassword({
  navigation,
}: AuthScreenProps<'ForgetPassword'>) {
  const {reset} = useResetNavigationSuccess();
  const {forgoutPassword, isLoading} = useAuthForgoutPassword({
    onSuccess: () => {
      reset(resetParams);
    },
  });
  const {control, formState, handleSubmit} = useForm<TypeForgetPasswordSchema>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      email: '',
    },
    mode: 'onChange',
  });

  function submitForm(email: TypeForgetPasswordSchema) {
    forgoutPassword(email);
  }
  return (
    <Screen canGoBack>
      <Text preset="headingLarge" mb="s14">
        Esqueci minha senha
      </Text>
      <Text preset="paragraphLarge">
        Digite seu e-mail e enviaremos as instruções para redefinição de senha
      </Text>
      <FormTextInput
        control={control}
        name="email"
        label="E-mail"
        placeholder="Digite seu e-mail"
        boxProps={{mt: 's24'}}
      />

      <Button
        loading={isLoading}
        disabled={!formState.isValid}
        title="Recuperar senha"
        mt="s48"
        onPress={handleSubmit(submitForm)}
      />
    </Screen>
  );
}
