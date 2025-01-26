import { AssessmentResponse, IAssessmentRepository } from '@lib/domains/assessment/repository';
import { IUseQueryProps, useQuery } from '@lib/utils/useQuery';

interface UseLeadsArgs extends Omit<IUseQueryProps<AssessmentResponse>, 'queryKey'> {
  repository: IAssessmentRepository;
  params: Record<string, unknown>;
}

export const useLeads = ({ repository, params, ...options }: UseLeadsArgs) => {
  const { data, ...rest } = useQuery({
    queryKey: ['leadsList', params],
    queryFn: async () => {
      return await repository.getAssessments({ params });
    },
    ...options,
  });
  return {
    data,
    ...rest,
  };
};
