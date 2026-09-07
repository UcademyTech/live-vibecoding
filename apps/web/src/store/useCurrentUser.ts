import { DEFAULT_STUDENT, findUserById } from '@live/shared';
import type { IUser } from '@live/shared';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface ICurrentUserStore {
  user: IUser;
  setUser: (user: IUser) => void;
  reset: () => void;
}

interface IPersistedState {
  user: IUser;
}

const STORAGE_KEY = 'current-user';

const isPersistedState = (value: unknown): value is IPersistedState =>
  typeof value === 'object' && value !== null && 'user' in value;

export const useCurrentUser = create<ICurrentUserStore>()(
  persist(
    (set) => ({
      user: DEFAULT_STUDENT,
      setUser: (user) => set({ user }),
      reset: () => set({ user: DEFAULT_STUDENT }),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state): IPersistedState => ({ user: state.user }),
      merge: (persisted, current) => {
        const persistedUser = isPersistedState(persisted) ? findUserById(persisted.user.id) : undefined;
        return { ...current, user: persistedUser ?? DEFAULT_STUDENT };
      },
    },
  ),
);
