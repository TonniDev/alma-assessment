import type { TextareaProps } from '@chakra-ui/react';
import type { Ref } from 'react';
import { Textarea } from '@chakra-ui/react';
import { FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form';
import { Field } from '@ui/base/chakra/field';

interface ValidatedTextareaProps<Type extends FieldValues> extends TextareaProps {
  register?: UseFormRegister<Type>;
  validation?: RegisterOptions<Type, Path<Type>>;
  label?: string;
  name: Path<Type>;
  error?: string;
  ref?: Ref<HTMLTextAreaElement> | undefined;
}

export function ValidatedTextarea<Type extends FieldValues>({
  register,
  validation,
  label,
  name,
  error,
  ref: externalRef,
  required,
  ...inputProps
}: ValidatedTextareaProps<Type>) {
  const { ref, ...registerProps } = register ? register(name, validation) : { ref: undefined };
  const internalRef = externalRef || ref;

  return (
    <Field label={label} required={required} invalid={Boolean(error)} errorText={error}>
      <Textarea
        ref={internalRef}
        name={name}
        variant="outline"
        {...registerProps}
        {...inputProps}
        required={required}
      />
    </Field>
  );
}
