import { AssessmentRepository } from '@lib/domains/assessment/repository';
import { AxiosService } from '@lib/Network/AxiosService';
import { useMemo } from 'react';

export const useAssessmentRepository = () => {
  return useMemo(() => new AssessmentRepository(new AxiosService()), []);
};
