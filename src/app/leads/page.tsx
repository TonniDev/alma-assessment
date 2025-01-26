import { LeadsFilters } from '@app/leads/components/LeadsFilters';
import { LeadsTable } from '@app/leads/components/LeadsTable';
import { Flex } from '@chakra-ui/react';

export default async function LeadsPage() {
  return (
    <Flex direction="column" gap={4} justify="flex-start" alignItems="flex-start" p={8} w="100%">
      <Flex>
        <LeadsFilters />
      </Flex>
      <LeadsTable />
    </Flex>
  );
}
