import {useState} from 'react';

import {cashFlowService} from '@domain';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';

import {Box, Button, FormTextInput, Screen, Text} from '@components';
import {AppTabScreenProps} from '@routes';

import {NewSchema, TypeNewSchema} from './NewSchema';

export function New({navigation}: AppTabScreenProps<'New'>) {
  const [selectedType, setSelectedType] = useState<'expense' | 'income'>(
    'income',
  );
  const [loading, setLoading] = useState(false);

  const {control, formState, handleSubmit, reset} = useForm<TypeNewSchema>({
    resolver: zodResolver(NewSchema),
    defaultValues: {
      amount: 0,
      description: '',
    },
    mode: 'onChange',
  });

  async function submitForm({amount, description}: TypeNewSchema) {
    try {
      setLoading(true);
      await cashFlowService.create({
        amount,
        date: new Date(),
        description,
        type: selectedType,
      });
      console.log('cadastro feito');
      reset();
      setSelectedType('income');
    } catch (err) {
      console.log('erro ao cadastrar', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen scrollable>
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
        <Button
          title="Receita"
          preset="noSelected"
          flex={1}
          mr="s8"
          selected={selectedType === 'income'}
          selectedColor="success"
          onPress={() => setSelectedType('income')}
        />
        <Button
          title="Despesa"
          preset="noSelected"
          flex={1}
          mb="s48"
          selected={selectedType === 'expense'}
          selectedColor="redError"
          onPress={() => setSelectedType('expense')}
        />
      </Box>

      <Button
        title="Registre"
        mt="s10"
        disabled={!formState.isValid}
        onPress={handleSubmit(submitForm)}
        loading={loading}
      />
    </Screen>
  );
}
