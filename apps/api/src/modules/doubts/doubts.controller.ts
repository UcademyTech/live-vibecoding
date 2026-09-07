import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { IUser, USER_ID_HEADER } from '@live/shared';
import { CurrentUser } from '../../common/current-user.decorator';
import { DoubtsService } from './doubts.service';
import { CreateDoubtDto } from './dto/create-doubt.dto';
import { DoubtDto } from './dto/doubt.dto';

@ApiTags('doubts')
@ApiSecurity(USER_ID_HEADER)
@Controller('doubts')
export class DoubtsController {
  constructor(private readonly doubtsService: DoubtsService) {}

  @Post()
  @ApiOperation({ summary: 'El alumno actual envía una duda sobre un curso' })
  @ApiCreatedResponse({ type: DoubtDto })
  create(@CurrentUser() user: IUser, @Body() dto: CreateDoubtDto): Promise<DoubtDto> {
    return this.doubtsService.create(user, dto);
  }

  @Get('mine')
  @ApiOperation({ summary: 'Dudas del alumno actual, la más reciente primero' })
  @ApiOkResponse({ type: DoubtDto, isArray: true })
  findMine(@CurrentUser() user: IUser): Promise<DoubtDto[]> {
    return this.doubtsService.findMine(user);
  }
}
