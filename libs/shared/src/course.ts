import { EVertical } from './enums';

export interface ICourse {
  id: string;
  name: string;
  vertical: EVertical;
  teacherId: string;
}
