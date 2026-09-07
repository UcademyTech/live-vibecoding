import type { ICreateDoubtPayload, IDoubt } from '@live/shared';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { UseMutationResult } from '@tanstack/react-query';
import { doubtsApi } from '../services/api';
import { DOUBTS_QUERY_KEY } from './useMyDoubts';

export const useCreateDoubt = (): UseMutationResult<IDoubt, Error, ICreateDoubtPayload> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ICreateDoubtPayload) => doubtsApi.create(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: DOUBTS_QUERY_KEY }),
  });
};
