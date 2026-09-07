import type { ICourse } from '@live/shared';
import { useQuery } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';
import { coursesApi } from '../services/api';

export const COURSES_QUERY_KEY = ['courses'] as const;

export const useCourses = (): UseQueryResult<ICourse[]> =>
  useQuery({
    queryKey: COURSES_QUERY_KEY,
    queryFn: () => coursesApi.findAll(),
  });
