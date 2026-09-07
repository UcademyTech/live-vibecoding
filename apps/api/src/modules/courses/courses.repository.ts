import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../../common/base.repository';
import { Course } from './course.schema';

@Injectable()
export class CoursesRepository extends BaseRepository<Course> {
  constructor(@InjectModel(Course.name) model: Model<Course>) {
    super(model);
  }
}
