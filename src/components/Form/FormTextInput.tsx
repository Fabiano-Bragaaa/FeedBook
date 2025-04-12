import {cleanCurrency, formatCurrency} from '@utils';
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
          value={isMoney ? formatCurrency(value || '') : value}
          onChangeText={
            isMoney
              ? text => {
                  const cleanValue = cleanCurrency(text);
                  onChange(cleanValue);
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
