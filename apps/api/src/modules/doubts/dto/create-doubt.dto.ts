import { ApiProperty } from '@nestjs/swagger';
import { ICreateDoubtPayload } from '@live/shared';
import { IsMongoId, IsString, Length } from 'class-validator';
import { QUESTION_MAX_LENGTH } from '../doubt.schema';

export class CreateDoubtDto implements ICreateDoubtPayload {
  @ApiProperty({ example: '64f000000000000000000001' })
  @IsMongoId()
  courseId: string;

  @ApiProperty({ example: '¿El silencio administrativo del tema 12 es positivo o negativo?', maxLength: QUESTION_MAX_LENGTH })
  @IsString()
  @Length(1, QUESTION_MAX_LENGTH)
  question: string;
}
