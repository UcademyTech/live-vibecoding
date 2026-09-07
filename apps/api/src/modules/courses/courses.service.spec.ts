import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { EVertical } from '@live/shared';
import { Types } from 'mongoose';
import { Course } from './course.schema';
import { CoursesRepository } from './courses.repository';
import { CoursesService } from './courses.service';

const COURSE_ID = '64f000000000000000000001';

const buildCourse = (overrides: Partial<Course> = {}): Course => ({
  _id: new Types.ObjectId(COURSE_ID),
  name: 'Auxiliar Administrativo del Estado',
  vertical: EVertical.OPOSICIONES,
  teacherId: 'u-ana',
  createdAt: new Date('2026-09-01T10:00:00.000Z'),
  updatedAt: new Date('2026-09-01T10:00:00.000Z'),
  ...overrides,
});

describe('CoursesService', () => {
  const repository = { findAll: jest.fn(), findById: jest.fn() };
  let service: CoursesService;

  beforeEach(async () => {
    jest.resetAllMocks();
    const moduleRef = await Test.createTestingModule({
      providers: [CoursesService, { provide: CoursesRepository, useValue: repository }],
    }).compile();
    service = moduleRef.get(CoursesService);
  });

  it('findAll returns every course sorted by name as dto', async () => {
    repository.findAll.mockResolvedValue([buildCourse()]);

    const result = await service.findAll();

    expect(repository.findAll).toHaveBeenCalledWith({}, { name: 1 });
    expect(result).toEqual([
      { id: COURSE_ID, name: 'Auxiliar Administrativo del Estado', vertical: EVertical.OPOSICIONES, teacherId: 'u-ana' },
    ]);
  });

  it('findByTeacherId filters by teacher and maps to dto', async () => {
    repository.findAll.mockResolvedValue([buildCourse({ teacherId: 'u-ana' })]);

    const result = await service.findByTeacherId('u-ana');

    expect(repository.findAll).toHaveBeenCalledWith({ teacherId: 'u-ana' }, { name: 1 });
    expect(result).toEqual([expect.objectContaining({ id: COURSE_ID, teacherId: 'u-ana' })]);
  });

  it('findOneById returns the course as dto', async () => {
    repository.findById.mockResolvedValue(buildCourse());

    const result = await service.findOneById(COURSE_ID);

    expect(repository.findById).toHaveBeenCalledWith(COURSE_ID);
    expect(result).toEqual(expect.objectContaining({ id: COURSE_ID }));
  });

  it('findOneById throws NotFoundException when the course does not exist', async () => {
    repository.findById.mockResolvedValue(null);

    await expect(service.findOneById(COURSE_ID)).rejects.toBeInstanceOf(NotFoundException);
  });
});
