import { LeadsFilters } from '@app/leads/components/LeadsFilters';
import { LeadsTable } from '@app/leads/components/LeadsTable';
import { Flex } from '@chakra-ui/react';
import { Suspense } from 'react';

export default async function LeadsPage() {
  return (
    <Flex direction="column" gap={4} justify="flex-start" alignItems="flex-start" p={8} w="100%">
      <Flex>
        <Suspense fallback={<div>Loading filters...</div>}>
          <LeadsFilters />
        </Suspense>
      </Flex>
      <Suspense fallback={<div>Loading data...</div>}>
        <LeadsTable />
      </Suspense>
    </Flex>
  );
}
