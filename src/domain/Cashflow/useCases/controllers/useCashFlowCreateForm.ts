import {useState} from 'react';

import {zodResolver} from '@hookform/resolvers/zod';
import {useAuthCredentials, useDay} from '@services';
import {CashFlowSchema, TypeCashFlowSchema} from '@utils';
import {useForm} from 'react-hook-form';

import {useCashFlowCreate} from '../mutations';

export function useCashFlowCreateForm() {
  const {mutate, isLoading} = useCashFlowCreate();
  const {userCredentials} = useAuthCredentials();
  const {day} = useDay();
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
      if (!userCredentials?.uid) {
        return;
      }

      const selectedDate = day ? new Date(day.dateString) : new Date();
      await mutate({
        amount,
        date: selectedDate,
        description,
        type: selectedType,
        userId: userCredentials.uid,
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
