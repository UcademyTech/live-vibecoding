import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { USERS } from '@live/shared';
import { Model } from 'mongoose';
import { Course } from '../modules/courses/course.schema';
import { Doubt } from '../modules/doubts/doubt.schema';
import { buildCourses, buildDoubts } from './seed.data';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectModel(Course.name) private readonly courseModel: Model<Course>,
    @InjectModel(Doubt.name) private readonly doubtModel: Model<Doubt>,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    const existingCourses = await this.courseModel.estimatedDocumentCount();
    if (existingCourses > 0) {
      this.logger.log(`Seed omitido: ya hay ${existingCourses} cursos en la base de datos`);
      return;
    }
    const now = new Date();
    const courses = await this.courseModel.insertMany(buildCourses(now));
    const doubts = await this.doubtModel.insertMany(buildDoubts(now));
    this.logger.log(`Seed listo: ${courses.length} cursos, ${doubts.length} dudas y ${USERS.length} usuarios (en libs/shared)`);
  }
}
