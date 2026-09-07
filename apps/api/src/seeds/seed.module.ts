import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from '../modules/courses/course.schema';
import { Doubt, DoubtSchema } from '../modules/doubts/doubt.schema';
import { SeedService } from './seed.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Course.name, schema: CourseSchema },
      { name: Doubt.name, schema: DoubtSchema },
    ]),
  ],
  providers: [SeedService],
})
export class SeedModule {}
