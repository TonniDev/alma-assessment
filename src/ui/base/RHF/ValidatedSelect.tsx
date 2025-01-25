'use client';

import { createListCollection } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { Field } from '@ui/base/chakra/field';

interface ControlledSelectProps<FormValues extends FieldValues = FieldValues> {
  error?: string;
  control: Control<FormValues>;
  label?: string;
  placeholder?: string;
  name: Path<FormValues>;
  options: readonly { label: string; value: string }[];
  required?: boolean;
}

createListCollection({
  items: [],
});

export function ValidatedSelect<FormValues extends FieldValues = FieldValues>({
  error,
  control,
  label,
  placeholder = 'Select an option',
  name,
  options,
  required,
}: ControlledSelectProps<FormValues>) {
  return (
    <Field label={label} invalid={!!error} errorText={error} required={required}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Select
            name={field.name}
            value={options.find(o => o.value === field.value) || null}
            onChange={e => {
              field.onChange(e?.value);
            }}
            options={options}
            placeholder={placeholder}
          />
        )}
      />
    </Field>
  );
}
