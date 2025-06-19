import {formatCurrency, parseCurrencyInput} from '@utils';
import {Controller, FieldValues, UseControllerProps} from 'react-hook-form';

import {TextInput, TextInputProps} from '@components';

type Props = TextInputProps & {
  isMoney?: boolean;
};

export function FormTextInput<FormType extends FieldValues>({
  control,
  name,
  isMoney,
  ...textInputProps
}: Props & UseControllerProps<FormType>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({field: {value, onChange}, fieldState: {error}}) => (
        <TextInput
          value={isMoney ? formatCurrency(value || 0) : value}
          onChangeText={
            isMoney
              ? text => {
                  const parsed = parseCurrencyInput(text);
                  onChange(parsed);
                }
              : onChange
          }
          errorMessage={error?.message}
          {...textInputProps}
        />
      )}
    />
  );
}
