import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EDoubtStatus, IDoubt } from '@live/shared';
import { Doubt } from '../doubt.schema';

export class DoubtDto implements IDoubt {
  @ApiProperty({ example: '64f000000000000000000101' })
  id: string;

  @ApiProperty({ example: '64f000000000000000000001' })
  courseId: string;

  @ApiProperty({ example: 'u-maria' })
  studentId: string;

  @ApiProperty({ example: '¿El silencio administrativo del tema 12 es positivo o negativo?' })
  question: string;

  @ApiProperty({ enum: EDoubtStatus })
  status: EDoubtStatus;

  @ApiPropertyOptional()
  answer?: string;

  @ApiPropertyOptional({ example: '2026-09-02T10:00:00.000Z' })
  answeredAt?: string;

  @ApiPropertyOptional({ example: 'u-ana' })
  answeredBy?: string;

  @ApiProperty({ example: '2026-09-01T10:00:00.000Z' })
  createdAt: string;

  @ApiProperty({ example: '2026-09-01T10:00:00.000Z' })
  updatedAt: string;

  static fromEntity(doubt: Doubt): DoubtDto {
    return {
      id: String(doubt._id),
      courseId: String(doubt.courseId),
      studentId: doubt.studentId,
      question: doubt.question,
      status: doubt.status,
      ...(doubt.answer !== undefined && { answer: doubt.answer }),
      ...(doubt.answeredAt !== undefined && { answeredAt: doubt.answeredAt.toISOString() }),
      ...(doubt.answeredBy !== undefined && { answeredBy: doubt.answeredBy }),
      createdAt: doubt.createdAt.toISOString(),
      updatedAt: doubt.updatedAt.toISOString(),
    };
  }
}
