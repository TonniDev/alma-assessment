import { DefaultError, useMutation as useTanstackMutation, UseMutationOptions } from '@tanstack/react-query';

export type IUseMutationProps<
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TContext = unknown,
> = UseMutationOptions<TData, TError, TVariables, TContext>;

export const useMutation = <TData = unknown, TError = DefaultError, TVariables = void, TContext = unknown>(
  props: IUseMutationProps<TData, TError, TVariables, TContext>,
) => {
  const { isPending, ...rest } = useTanstackMutation(props);

  return {
    isLoading: isPending,
    ...rest,
  };
};
