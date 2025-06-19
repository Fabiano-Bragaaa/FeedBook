import {useEffect, useState} from 'react';

import {
  CashFlow,
  cashFlowService,
  useCashFlowUpdate,
  useItemById,
} from '@domain';
import {zodResolver} from '@hookform/resolvers/zod';
import {CashFlowSchema, TypeCashFlowSchema} from '@utils';
import {useForm} from 'react-hook-form';
import {ScrollView} from 'react-native-gesture-handler';

import {
  ActivityIndicator,
  Box,
  Button,
  FormTextInput,
  Screen,
  Text,
} from '@components';
import {AppScreenProps} from '@routes';

export function Edit({route, navigation}: AppScreenProps<'Edit'>) {
  const id = route.params.id;
  const {data, isError, isLoading} = useItemById(id);

  const {mutate} = useCashFlowUpdate();

  const [selectedType, setSelectedType] = useState<'expense' | 'income'>(
    'income',
  );
  const [loading, setLoading] = useState(false);
  const [dataList, setDataList] = useState<CashFlow>();

  const {control, formState, handleSubmit, reset} = useForm<TypeCashFlowSchema>(
    {
      resolver: zodResolver(CashFlowSchema),
      defaultValues: {
        amount: 0,
        description: '',
      },
      mode: 'onChange',
    },
  );

  async function updateData({amount, description}: TypeCashFlowSchema) {
    try {
      setLoading(true);
      await mutate({
        id,
        updatedData: {
          amount,
          description,
          type: selectedType,
        },
      });
      navigation.navigate('AppTabNavigator', {screen: 'Home'});
      console.log('atualizado');
    } catch (err) {
      console.log('erro ao cadastrar', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!data) {
      return;
    }

    setDataList(data);
    setSelectedType(data.type);
    reset({
      amount: data.amount,
      description: data.description,
    });
  }, [data, reset]);

  return (
    <Screen canGoBack scrollable>
      {isLoading && <ActivityIndicator />}
      {isError && <Text>Erro ao carregar os dados da movimentação</Text>}
      {data && (
        <>
          <Text preset="headingMedium" mb="s32">
            Edite sua movimentação
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
            onPress={handleSubmit(updateData)}
            loading={loading}
          />
        </>
      )}
    </Screen>
  );
}
