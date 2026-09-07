import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoursesModule } from '../courses/courses.module';
import { Doubt, DoubtSchema } from './doubt.schema';
import { DoubtsController } from './doubts.controller';
import { DoubtsRepository } from './doubts.repository';
import { DoubtsService } from './doubts.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Doubt.name, schema: DoubtSchema }]), CoursesModule],
  controllers: [DoubtsController],
  providers: [DoubtsRepository, DoubtsService],
  exports: [DoubtsService],
})
export class DoubtsModule {}
