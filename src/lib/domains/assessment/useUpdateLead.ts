import { AssessmentResponse, IAssessmentRepository, UpdateLeadStatusPayload } from '@lib/domains/assessment/repository';
import { IUseMutationProps, useMutation } from '@lib/utils/useMutation';

interface UseUpdateLeadProps extends IUseMutationProps<AssessmentResponse, Error, UpdateLeadStatusPayload> {
  repository: IAssessmentRepository;
}

export const useUpdateLead = ({ repository, onSuccess, onError }: UseUpdateLeadProps) => {
  const { mutate, ...rest } = useMutation({
    mutationKey: ['changeLeadStatus'],
    mutationFn: (payload: UpdateLeadStatusPayload) => repository.changeLeadStatus({ data: payload }),
    onSuccess,
    onError,
  });

  return {
    changeLeadStatus: mutate,
    ...rest,
  };
};
