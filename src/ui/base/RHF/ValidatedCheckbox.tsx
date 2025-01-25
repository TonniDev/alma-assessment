'use client';
import { CheckboxGroup, Fieldset } from '@chakra-ui/react';
import { Checkbox } from '@ui/base/chakra/checkbox';
import { Control, FieldValues, Path, useController } from 'react-hook-form';

interface ValidatedCheckboxProps<FormValues extends FieldValues = FieldValues> {
  control: Control<FormValues>;
  name: Path<FormValues>;
  items: readonly { label: string; value: string }[];
  error?: string;
}

export function ValidatedCheckbox<FormValues extends FieldValues>({
  control,
  name,
  items,
  error,
}: ValidatedCheckboxProps<FormValues>) {
  const { field } = useController<FormValues>({
    control,
    name,
  });

  return (
    <Fieldset.Root invalid={!!error}>
      <CheckboxGroup invalid={!!error} value={field.value} onValueChange={field.onChange} name={field.name}>
        <Fieldset.Content>
          {items.map(item => (
            <Checkbox key={item.value} value={item.value}>
              {item.label}
            </Checkbox>
          ))}
        </Fieldset.Content>
      </CheckboxGroup>

      {error && <Fieldset.ErrorText>{error}</Fieldset.ErrorText>}
    </Fieldset.Root>
  );
}
