import {Controller, FieldValues, UseControllerProps} from 'react-hook-form';

import {PasswordInput, PasswordInputProps} from '@components';

export function FormPasswordTextInput<FormType extends FieldValues>({
  control,
  name,
  ...passwordInputProps
}: PasswordInputProps & UseControllerProps<FormType>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({field: {onChange, value}, fieldState: {error}}) => (
        <PasswordInput
          value={value}
          onChangeText={onChange}
          errorMessage={error?.message}
          {...passwordInputProps}
        />
      )}
    />
  );
}
