import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { CoursesModule } from './modules/courses/courses.module';
import { DoubtsModule } from './modules/doubts/doubts.module';
import { SeedModule } from './seeds/seed.module';

@Module({
  imports: [DatabaseModule, CoursesModule, DoubtsModule, SeedModule],
})
export class AppModule {}
