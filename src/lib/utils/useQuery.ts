import { DefaultError, useQuery as useTanstackQuery, UseQueryOptions } from '@tanstack/react-query';

export interface IUseQueryProps<TQueryFnData = unknown, TError = DefaultError, TData = TQueryFnData>
  extends UseQueryOptions<TQueryFnData, TError, TData> {
  onSuccess?: (data: TData) => void;
  onError?: (error: TError) => void;
  onSettled?: () => void;
}

export const useQuery = <TQueryFnData = unknown, TError = DefaultError, TData = TQueryFnData>({
  onSuccess,
  onError,
  onSettled,
  ...props
}: IUseQueryProps<TQueryFnData, TError, TData>) => {
  return useTanstackQuery({
    ...props,
    queryFn: async context => {
      if (!props.queryFn || typeof props.queryFn !== 'function') {
        throw new Error('queryFn is required');
      }
      try {
        const response = await props.queryFn(context);
        onSuccess?.(response as TData);
        return response;
      } catch (error) {
        onError?.(error as TError);
        throw error;
      } finally {
        onSettled?.();
      }
    },
  });
};
