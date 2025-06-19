import {useCashFlowCreateForm} from '@domain';

import {Box, Button, FormTextInput, Screen, Text} from '@components';
import {AppTabScreenProps} from '@routes';

export function New({navigation}: AppTabScreenProps<'New'>) {
  const {
    control,
    formState,
    handleSubmit,
    submitForm,
    selectedType,
    setSelectedType,
    loading,
  } = useCashFlowCreateForm();

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
