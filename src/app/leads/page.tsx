import { LeadsFilters } from '@app/leads/components/LeadsFilters';
import { Flex } from '@chakra-ui/react';
import {AssessmentRepository} from '@lib/domains/assessment/repository';
import {AxiosService} from '@lib/Network/AxiosService';

const repository = new AssessmentRepository(new AxiosService());

export default async function LeadsPage() {

  const leads = await repository.getAssessments();

  return (
    <Flex direction="column" gap={4} justify="flex-start" alignItems="flex-start" p={8} w="100%">
      <Flex>
        <LeadsFilters />
      </Flex>
      
    </Flex>
  );
}
