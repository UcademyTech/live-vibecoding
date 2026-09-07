import { Injectable, NotFoundException } from '@nestjs/common';
import { CoursesRepository } from './courses.repository';
import { CourseDto } from './dto/course.dto';

const SORT_BY_NAME = { name: 1 } as const;

@Injectable()
export class CoursesService {
  constructor(private readonly coursesRepository: CoursesRepository) {}

  async findAll(): Promise<CourseDto[]> {
    const courses = await this.coursesRepository.findAll({}, SORT_BY_NAME);
    return courses.map(CourseDto.fromEntity);
  }

  async findByTeacherId(teacherId: string): Promise<CourseDto[]> {
    const courses = await this.coursesRepository.findAll({ teacherId }, SORT_BY_NAME);
    return courses.map(CourseDto.fromEntity);
  }

  async findOneById(courseId: string): Promise<CourseDto> {
    const course = await this.coursesRepository.findById(courseId);
    if (!course) {
      throw new NotFoundException(`Course ${courseId} not found`);
    }
    return CourseDto.fromEntity(course);
  }
}
