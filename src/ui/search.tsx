'use client';

import { Flex, Group, Input, InputAddon } from '@chakra-ui/react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { HiMiniMagnifyingGlass } from 'react-icons/hi2';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (params.get('page')) {
      params.delete('page');
    }
    if (term) {
      params.set('search', term);
    } else {
      params.delete('search');
    }
    void replace(`${pathname}?${params.toString()}`);
  }, 400);
  return (
    <Flex minW="250px">
      <Group attached>
        <InputAddon>
          <HiMiniMagnifyingGlass />
        </InputAddon>
        <Input
          placeholder={placeholder}
          onChange={e => handleSearch(e.target.value)}
          defaultValue={searchParams.get('search')?.toString()}
        />
      </Group>
    </Flex>
  );
}
