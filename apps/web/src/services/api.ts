import { USER_ID_HEADER } from '@live/shared';
import type { ICourse, ICreateDoubtPayload, IDoubt } from '@live/shared';
import axios from 'axios';
import { useCurrentUser } from '../store/useCurrentUser';

const API_BASE_URL = '/api';

export const api = axios.create({ baseURL: API_BASE_URL });

api.interceptors.request.use((config) => {
  config.headers.set(USER_ID_HEADER, useCurrentUser.getState().user.id);
  return config;
});

export const coursesApi = {
  findAll: async (): Promise<ICourse[]> => {
    const { data } = await api.get<ICourse[]>('/courses');
    return data;
  },
};

export const doubtsApi = {
  findMine: async (): Promise<IDoubt[]> => {
    const { data } = await api.get<IDoubt[]>('/doubts/mine');
    return data;
  },
  create: async (payload: ICreateDoubtPayload): Promise<IDoubt> => {
    const { data } = await api.post<IDoubt>('/doubts', payload);
    return data;
  },
};
