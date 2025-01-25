import type { InputProps } from '@chakra-ui/react';
import type { Ref } from 'react';
import { Input } from '@chakra-ui/react';
import { FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form';
import { Field } from '@ui/base/chakra/field';

interface IValidatedInput<Type extends FieldValues> extends InputProps {
  register?: UseFormRegister<Type>;
  validation?: RegisterOptions<Type, Path<Type>>;
  label?: string;
  name: Path<Type>;
  error?: string;
  ref?: Ref<HTMLInputElement> | undefined;
}

export function ValidatedInput<Type extends FieldValues>({
  register,
  validation,
  label,
  name,
  error,
  ref: externalRef,
  required,
  ...inputProps
}: IValidatedInput<Type>) {
  const { ref, ...registerProps } = register ? register(name, validation) : { ref: undefined };
  const internalRef = externalRef || ref;

  return (
    <Field label={label} required={required} invalid={Boolean(error)} errorText={error}>
      <Input ref={internalRef} name={name} variant="outline" {...registerProps} {...inputProps} required={required} />
    </Field>
  );
}
