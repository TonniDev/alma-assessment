import { InputProps } from '@chakra-ui/react';
import { Flex, Icon, Input, Text } from '@chakra-ui/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import type {
  Control,
  ControllerFieldState,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  UseFormStateReturn,
} from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { IoIosCloudUpload } from 'react-icons/io';
import { FaRegFilePdf } from 'react-icons/fa';

interface FileUploadProps<
  FormValues extends FieldValues = FieldValues,
  FieldName extends FieldPath<FormValues> = FieldPath<FormValues>,
> extends Omit<InputProps, 'name'> {
  control: Control<FormValues>;
  name: FieldName;
  file?: File;
  error?: string;
}
export interface CustomControllerRenderProps<
  FormValues extends FieldValues = FieldValues,
  FieldName extends FieldPath<FormValues> = FieldPath<FormValues>,
> {
  field: ControllerRenderProps<FormValues, FieldName>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<FormValues>;
}

export function ValidatedFileUpload<
  FormValues extends FieldValues = FieldValues,
  FieldName extends FieldPath<FormValues> = FieldPath<FormValues>,
>({ name, file, control, error, ...props }: FileUploadProps<FormValues, FieldName>) {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

  const onSelectFile = useCallback(
    (selectedFile: File) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    },
    [setPreview],
  );

  const renderControlledFileUpload = useCallback(
    ({ field: { onChange, ref, name, onBlur, disabled } }: CustomControllerRenderProps<FormValues, FieldName>) => {
      const handleDragOver: React.DragEventHandler<HTMLDivElement> = event => {
        event.preventDefault();
        setDragOver(true);
      };

      const handleDragLeave: React.DragEventHandler<HTMLDivElement> = event => {
        event.preventDefault();
        setDragOver(false);
      };

      const handleDrop: React.DragEventHandler<HTMLDivElement> = event => {
        event.preventDefault();
        setDragOver(false);
        if (event.dataTransfer.files && event.dataTransfer.files[0]) {
          onChange(event.dataTransfer.files[0]);
          onSelectFile(event.dataTransfer.files[0]);
        }
      };

      const handleChange: React.ChangeEventHandler<HTMLInputElement> = event => {
        if (event.currentTarget.files && event.currentTarget.files[0]) {
          onChange(event.currentTarget.files[0]);
          onSelectFile(event.currentTarget.files[0]);
        }
      };

      const onChangeInput: React.ChangeEventHandler<HTMLInputElement> = e => {
        handleChange(e);
        onChange(e?.target?.files?.[0]);
      };

      const handleClick = () => {
        fileRef.current?.click();
      };

      return (
        <Flex gap={4} alignItems="center" w="100%">
          <Flex
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleClick}
            cursor="pointer"
            w="100%"
            px={6}
            py={{ base: 3, md: preview ? 2 : 3 }}
            flexDir="column"
            alignItems="center"
            border={preview ? '2px solid' : '2px dashed'}
            borderRadius="md"
            borderColor={dragOver ? 'gray.400' : preview ? 'blue.200' : 'gray.700'}
            gap={3}
          >
            <Input
              type="file"
              multiple={false}
              value={undefined}
              onChange={onChangeInput}
              style={{ display: 'none' }}
              ref={e => {
                ref(e);
                fileRef.current = e;
              }}
              name={name}
              onBlur={onBlur}
              disabled={disabled}
              accept="application/pdf"
              {...props}
            />
            <Flex as="label" justify="space-between" w="100%" alignItems="center" gap={4} cursor="pointer">
              {file ? (
                <>
                  <Flex alignItems="center" justify="center" w="20px" maxH="100%" grow={1}>
                    {preview ? (
                      <Icon as={FaRegFilePdf} fontSize="2xl" />
                    ) : (
                      <Icon as={IoIosCloudUpload} fontSize="2xl" />
                    )}
                  </Flex>
                  <Flex grow={2} minW="50%">
                    <Text gridRow={2} truncate>
                      {file.name}
                    </Text>
                  </Flex>
                </>
              ) : (
                <>
                  <Flex justify="center" grow={1}>
                    <Icon as={IoIosCloudUpload} fontSize="2xl" />
                  </Flex>
                  <Text gridRow={2}>
                    Upload your resume (optional)
                    <Text as="span" display="block" color="gray.500">
                      Only .pdf files.
                    </Text>
                  </Text>
                </>
              )}
            </Flex>
            {error && <Text color="red.500">{error}</Text>}
          </Flex>
        </Flex>
      );
    },
    [dragOver, error, file, onSelectFile, preview, props],
  );

  useEffect(() => {
    if (!file) {
      setPreview(null);
    }
  }, [file, setPreview]);

  return <Controller control={control} name={name} render={renderControlledFileUpload} />;
}
