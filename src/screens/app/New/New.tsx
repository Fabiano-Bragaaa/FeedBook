import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';

import {Box, Button, FormTextInput, Screen, Text} from '@components';
import {AppTabScreenProps} from '@routes';

import {NewSchema, TypeNewSchema} from './NewSchema';

export function New({navigation}: AppTabScreenProps<'New'>) {
  const {control, formState, handleSubmit} = useForm<TypeNewSchema>({
    resolver: zodResolver(NewSchema),
    defaultValues: {
      amount: 0,
      description: '',
    },
    mode: 'onChange',
  });

  function submitForm(props: TypeNewSchema) {
    console.log(props);
  }

  return (
    <Screen>
      <Text preset="headingMedium" mb="s32">
        Registre suas movimentações
      </Text>
      <FormTextInput
        control={control}
        name="description"
        label="Descrição"
        placeholder="Descreva essa movimentação"
        boxProps={{
          mb: 's24',
        }}
      />

      <FormTextInput
        control={control}
        name="amount"
        label="Valor"
        placeholder="Valor da movimentação"
        keyboardType="numeric"
        isMoney
        boxProps={{
          mb: 's32',
        }}
      />

      <Box flexDirection="row">
        <Button title="Receita" preset="outline" flex={1} mr="s8" />
        <Button title="Despesa" preset="outline" flex={1} mb="s56" />
      </Box>

      <Button
        title="Ir para settings"
        mt="s10"
        disabled={!formState.isValid}
        onPress={handleSubmit(submitForm)}
      />
    </Screen>
  );
}
