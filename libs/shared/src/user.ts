import { EUserRole } from './enums';

export interface IUser {
  id: string;
  name: string;
  role: EUserRole;
}
