import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { IUser, USER_ID_HEADER } from '@live/shared';
import { CurrentUser } from '../../common/current-user.decorator';
import { CoursesService } from './courses.service';
import { CourseDto } from './dto/course.dto';

@ApiTags('courses')
@ApiSecurity(USER_ID_HEADER)
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  @ApiOperation({ summary: 'Lista todos los cursos' })
  @ApiOkResponse({ type: CourseDto, isArray: true })
  findAll(@CurrentUser() _user: IUser): Promise<CourseDto[]> {
    return this.coursesService.findAll();
  }
}
