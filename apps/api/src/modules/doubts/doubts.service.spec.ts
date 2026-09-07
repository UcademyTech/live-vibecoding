import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { EDoubtStatus, EUserRole, EVertical, IUser } from '@live/shared';
import { Types } from 'mongoose';
import { CoursesService } from '../courses/courses.service';
import { Doubt } from './doubt.schema';
import { DoubtsRepository } from './doubts.repository';
import { DoubtsService } from './doubts.service';

const COURSE_ID = '64f000000000000000000001';
const DOUBT_ID = '64f000000000000000000101';

const student: IUser = { id: 'u-maria', name: 'María', role: EUserRole.STUDENT };
const teacher: IUser = { id: 'u-ana', name: 'Ana', role: EUserRole.TEACHER };

const buildDoubt = (overrides: Partial<Doubt> = {}): Doubt => ({
  _id: new Types.ObjectId(DOUBT_ID),
  courseId: new Types.ObjectId(COURSE_ID),
  studentId: student.id,
  question: '¿El silencio administrativo del tema 12 es positivo o negativo?',
  status: EDoubtStatus.PENDING,
  createdAt: new Date('2026-09-01T10:00:00.000Z'),
  updatedAt: new Date('2026-09-01T10:00:00.000Z'),
  ...overrides,
});

describe('DoubtsService', () => {
  const repository = { findAll: jest.fn(), findById: jest.fn(), create: jest.fn(), updateById: jest.fn() };
  const coursesService = { findOneById: jest.fn(), findByTeacherId: jest.fn() };
  let service: DoubtsService;

  beforeEach(async () => {
    jest.resetAllMocks();
    const moduleRef = await Test.createTestingModule({
      providers: [
        DoubtsService,
        { provide: DoubtsRepository, useValue: repository },
        { provide: CoursesService, useValue: coursesService },
      ],
    }).compile();
    service = moduleRef.get(DoubtsService);
  });

  describe('create', () => {
    const payload = { courseId: COURSE_ID, question: '¿El silencio administrativo del tema 12 es positivo o negativo?' };

    it('throws ForbiddenException when the user is not a student', async () => {
      await expect(service.create(teacher, payload)).rejects.toBeInstanceOf(ForbiddenException);
      expect(repository.create).not.toHaveBeenCalled();
    });

    it('throws NotFoundException when the course does not exist', async () => {
      coursesService.findOneById.mockRejectedValue(new NotFoundException());

      await expect(service.create(student, payload)).rejects.toBeInstanceOf(NotFoundException);
      expect(repository.create).not.toHaveBeenCalled();
    });

    it('stores the doubt as pending for the current student and returns the dto', async () => {
      coursesService.findOneById.mockResolvedValue({ id: COURSE_ID, name: 'Curso', vertical: EVertical.OPOSICIONES, teacherId: teacher.id });
      repository.create.mockResolvedValue(buildDoubt());

      const result = await service.create(student, payload);

      expect(repository.create).toHaveBeenCalledWith({
        courseId: new Types.ObjectId(COURSE_ID),
        studentId: student.id,
        question: payload.question,
        status: EDoubtStatus.PENDING,
      });
      expect(result).toEqual({
        id: DOUBT_ID,
        courseId: COURSE_ID,
        studentId: student.id,
        question: payload.question,
        status: EDoubtStatus.PENDING,
        createdAt: '2026-09-01T10:00:00.000Z',
        updatedAt: '2026-09-01T10:00:00.000Z',
      });
    });
  });

  describe('findMine', () => {
    it('returns the doubts of the current user, newest first', async () => {
      repository.findAll.mockResolvedValue([buildDoubt()]);

      const result = await service.findMine(student);

      expect(repository.findAll).toHaveBeenCalledWith({ studentId: student.id }, { createdAt: -1 });
      expect(result).toEqual([expect.objectContaining({ id: DOUBT_ID, studentId: student.id })]);
    });

    it('maps answered doubts with answer fields as ISO strings', async () => {
      repository.findAll.mockResolvedValue([
        buildDoubt({
          status: EDoubtStatus.ANSWERED,
          answer: 'Es negativo salvo que la norma diga lo contrario.',
          answeredAt: new Date('2026-09-02T10:00:00.000Z'),
          answeredBy: teacher.id,
        }),
      ]);

      const [result] = await service.findMine(student);

      expect(result).toEqual(
        expect.objectContaining({
          status: EDoubtStatus.ANSWERED,
          answer: 'Es negativo salvo que la norma diga lo contrario.',
          answeredAt: '2026-09-02T10:00:00.000Z',
          answeredBy: teacher.id,
        }),
      );
    });
  });
});
