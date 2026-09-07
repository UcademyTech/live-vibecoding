import { EUserRole } from './enums';
import { IUser } from './user';

export const USER_ID_HEADER = 'x-user-id';

export const USERS: readonly IUser[] = [
  { id: 'u-maria', name: 'María', role: EUserRole.STUDENT },
  { id: 'u-lucia', name: 'Lucía', role: EUserRole.STUDENT },
  { id: 'u-jorge', name: 'Jorge', role: EUserRole.STUDENT },
  { id: 'u-ana', name: 'Ana', role: EUserRole.TEACHER },
  { id: 'u-luis', name: 'Luis', role: EUserRole.TEACHER },
];

export const DEFAULT_STUDENT: IUser = USERS[0];

export const findUserById = (id: string): IUser | undefined => USERS.find((user) => user.id === id);
