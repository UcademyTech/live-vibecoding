import { ForbiddenException, Injectable } from '@nestjs/common';
import { EDoubtStatus, EUserRole, IUser } from '@live/shared';
import { Types } from 'mongoose';
import { CoursesService } from '../courses/courses.service';
import { DoubtsRepository } from './doubts.repository';
import { CreateDoubtDto } from './dto/create-doubt.dto';
import { DoubtDto } from './dto/doubt.dto';

const SORT_NEWEST_FIRST = { createdAt: -1 } as const;

@Injectable()
export class DoubtsService {
  constructor(
    private readonly doubtsRepository: DoubtsRepository,
    private readonly coursesService: CoursesService,
  ) {}

  async create(user: IUser, dto: CreateDoubtDto): Promise<DoubtDto> {
    if (user.role !== EUserRole.STUDENT) {
      throw new ForbiddenException('Only students can create doubts');
    }
    await this.coursesService.findOneById(dto.courseId);
    const doubt = await this.doubtsRepository.create({
      courseId: new Types.ObjectId(dto.courseId),
      studentId: user.id,
      question: dto.question,
      status: EDoubtStatus.PENDING,
    });
    return DoubtDto.fromEntity(doubt);
  }

  async findMine(user: IUser): Promise<DoubtDto[]> {
    const doubts = await this.doubtsRepository.findAll({ studentId: user.id }, SORT_NEWEST_FIRST);
    return doubts.map(DoubtDto.fromEntity);
  }
}
