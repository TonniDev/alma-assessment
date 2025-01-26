'use client';

import { Button, Flex, Image, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { AssessmentRepository } from '@lib/domains/assessment/repository';
import { AxiosService } from '@lib/Network/AxiosService';
import { CountriesToArray } from '@lib/utils/countries.constant';
import { VisasToArray } from '@lib/utils/visa.constants';
import { EVisa } from '@prisma/client';
import { ValidatedInput } from '@ui/base/RHF/ValidatedInput';
import { ValidatedSelect } from '@ui/base/RHF/ValidatedSelect';
import { ValidatedCheckbox } from '@ui/base/RHF/ValidatedCheckbox';
import { ValidatedFileUpload } from '@ui/base/RHF/ValidatedFileUpload';
import { ValidatedTextarea } from '@ui/base/RHF/ValidatedTextarea';
import { useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  countryOfCitizenship: string;
  linkedinUrl: string;
  visaType: string[];
  description: string;
  resume?: File;
}

const FormSchema = z.object({
  firstName: z.string().min(2, 'First name is required.').max(255),
  lastName: z.string().min(2).max(255),
  email: z.string().email(),
  countryOfCitizenship: z.string(),
  linkedinUrl: z.string().url(),
  visaType: z.array(z.string()),
  resume: z.instanceof(File).optional(),
  description: z.string().min(2).max(1000),
});

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  countryOfCitizenship: '',
  linkedinUrl: '',
  visaType: [],
  resume: undefined,
  description: '',
};

const repository = new AssessmentRepository(new AxiosService());

export default function AssessmentForm() {
  const CountriesArray = useMemo(() => CountriesToArray(), []);
  const VisasArray = useMemo(() => [...VisasToArray(), { label: "I don't know", value: 'not_known' }], []);
  const {
    register,
    handleSubmit,
    control,
    formState: { isValid, errors },
    reset,
    watch,
  } = useForm<FormValues>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: initialValues,
    resolver: zodResolver(FormSchema),
  });

  const { firstName, lastName, email, countryOfCitizenship, linkedinUrl, visaType, description, resume } = errors;
  const resumeFile = watch('resume');

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    console.log('Submitting the form', data);

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'visaType') {
        value.forEach((item: EVisa) => {
          formData.append(`visaInterest[${key}]`, item);
        });
      } else {
        formData.append(key, value);
      }
    });

    try {
      const response = await repository.sendAssessment({ data: formData });
      if (response.status === 201) {
        reset(initialValues);
        alert('Form submitted successfully');
        // TODO: show success modal
      }
    } catch (error) {
      console.log('Error', error);
    }
  };

  return (
    <Flex direction="column" gap={6} justify="flex-start" alignItems="center">
      <Image src="/file_info.png" objectFit="contain" width="100px" alt="File info icon" />
      <Text fontSize="2xl" fontWeight="bold" color="gray.900" mt={3}>
        Want to understand your visa options?
      </Text>
      <Text fontSize="xl" textAlign="center" fontWeight="bold" color="gray.900" mt={3}>
        Submit your form below and our team of experienced attorneys will review your information and send a preliminary
        assessment of your case based on your goals.
      </Text>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '420px' }}>
        <Flex direction="column" gap={4}>
          <ValidatedFileUpload control={control} name="resume" error={resume?.message} file={resumeFile} />
          <ValidatedInput<FormValues>
            required
            name="firstName"
            placeholder="First Name"
            error={firstName?.message}
            register={register}
          />
          <ValidatedInput<FormValues>
            required
            name="lastName"
            placeholder="Last Name"
            register={register}
            error={lastName?.message}
          />
          <ValidatedInput<FormValues>
            required
            name="email"
            placeholder="Email"
            error={email?.message}
            register={register}
          />
          <ValidatedSelect
            required
            placeholder="Country of Citizenship"
            name="countryOfCitizenship"
            options={CountriesArray}
            error={countryOfCitizenship?.message}
            control={control}
          />
          <ValidatedInput<FormValues>
            name="linkedinUrl"
            placeholder="LinkedIn / Personal website URL"
            error={linkedinUrl?.message}
            register={register}
          />
          <Flex direction="column" gap={3} justify="flex-start" alignItems="center">
            <Image src="/die.png" objectFit="contain" width="100px" alt="Die icon" />
            <Text fontSize="2xl" fontWeight="bold" color="gray.900">
              Visa categories of interest?
            </Text>
          </Flex>
          <ValidatedCheckbox control={control} name="visaType" items={VisasArray} error={visaType?.message} />
          <Flex direction="column" gap={3} justify="flex-start" alignItems="center">
            <Image src="/heart.png" objectFit="contain" width="100px" alt="Die icon" />
            <Text fontSize="2xl" fontWeight="bold" color="gray.900">
              How can we help you?
            </Text>
          </Flex>
          <ValidatedTextarea<FormValues>
            name="description"
            register={register}
            placeholder="What's your current status and when does it expire? What is your past immigration history? Are you looking for long-term permanent residency or short-term employment visa or both? Are there any timeline considerations?"
            error={description?.message}
            minH="200px"
          />

          <Button type="submit" disabled={!isValid}>
            Submit
          </Button>
        </Flex>
      </form>
    </Flex>
  );
}
