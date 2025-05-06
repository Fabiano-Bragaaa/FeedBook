import {useState} from 'react';

import {zodResolver} from '@hookform/resolvers/zod';
import {CashFlowSchema, TypeCashFlowSchema} from '@utils';
import {useForm} from 'react-hook-form';

import {useCashFlowCreate} from '../mutations';

export function useCashFlowCreateForm() {
  const {mutate, isLoading} = useCashFlowCreate();
  const [selectedType, setSelectedType] = useState<'expense' | 'income'>(
    'income',
  );

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

  async function submitForm({amount, description}: TypeCashFlowSchema) {
    try {
      await mutate({
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
    }
  }

  return {
    control,
    formState,
    handleSubmit,
    submitForm,
    selectedType,
    setSelectedType,
    loading: isLoading,
  };
}
