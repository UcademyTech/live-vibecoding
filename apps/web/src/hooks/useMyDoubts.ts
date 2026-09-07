import type { IDoubt } from '@live/shared';
import { useQuery } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';
import { doubtsApi } from '../services/api';
import { useCurrentUser } from '../store/useCurrentUser';

export const DOUBTS_QUERY_KEY = ['doubts'] as const;

export const useMyDoubts = (): UseQueryResult<IDoubt[]> => {
  const userId = useCurrentUser((state) => state.user.id);

  return useQuery({
    queryKey: [...DOUBTS_QUERY_KEY, 'mine', userId],
    queryFn: () => doubtsApi.findMine(),
  });
};
