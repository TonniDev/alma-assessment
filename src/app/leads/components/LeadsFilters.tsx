'use client';

import { Flex } from '@chakra-ui/react';
import { EStatus } from '@prisma/client';
import Search from '@ui/search';
import { Select, OnChangeValue } from 'chakra-react-select';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

const statusOptions = [
  { label: 'Pending', value: EStatus.PENDING },
  { label: 'Reached out', value: EStatus.REACHED_OUT },
];

export const LeadsFilters = () => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const { replace } = useRouter();

  const onChangeStatus = useCallback((option: OnChangeValue<{label: string; value: EStatus}, false>) => {
    if (!option) {
      void replace(`${pathname}`);
    } else {
      void replace(`${pathname}?status=${option.value}`);
    }
  }, [pathname, replace]);

  return (
    <Flex gap={1}>
      <Search placeholder="Search" />
      <Select
        options={statusOptions}
        value={statusOptions.find(option => option.value === params.get('status'))}
        onChange={onChangeStatus}
        placeholder="Status"
        isClearable
        chakraStyles={{
          container: provided => ({
            ...provided,
            width: '140px',
          }),
        }}
      ></Select>
    </Flex>
  );
};
