import { ApiProperty } from '@nestjs/swagger';
import { EVertical, ICourse } from '@live/shared';
import { Course } from '../course.schema';

export class CourseDto implements ICourse {
  @ApiProperty({ example: '64f000000000000000000001' })
  id: string;

  @ApiProperty({ example: 'Auxiliar Administrativo del Estado' })
  name: string;

  @ApiProperty({ enum: EVertical })
  vertical: EVertical;

  @ApiProperty({ example: 'u-ana' })
  teacherId: string;

  static fromEntity(course: Course): CourseDto {
    return {
      id: String(course._id),
      name: course.name,
      vertical: course.vertical,
      teacherId: course.teacherId,
    };
  }
}
