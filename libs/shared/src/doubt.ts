import { EDoubtStatus } from './enums';

export interface IDoubt {
  id: string;
  courseId: string;
  studentId: string;
  question: string;
  status: EDoubtStatus;
  answer?: string;
  answeredAt?: string;
  answeredBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateDoubtPayload {
  courseId: string;
  question: string;
}
