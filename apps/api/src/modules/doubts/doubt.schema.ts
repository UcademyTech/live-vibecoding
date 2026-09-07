import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EDoubtStatus } from '@live/shared';
import { HydratedDocument, Types } from 'mongoose';
import { Course } from '../courses/course.schema';

export const QUESTION_MAX_LENGTH = 2000;

@Schema({ timestamps: true })
export class Doubt {
  _id: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: Course.name })
  courseId: Types.ObjectId;

  @Prop({ required: true, index: true })
  studentId: string;

  @Prop({ required: true, trim: true, maxlength: QUESTION_MAX_LENGTH })
  question: string;

  @Prop({ required: true, enum: Object.values(EDoubtStatus), default: EDoubtStatus.PENDING })
  status: EDoubtStatus;

  @Prop()
  answer?: string;

  @Prop()
  answeredAt?: Date;

  @Prop()
  answeredBy?: string;

  createdAt: Date;

  updatedAt: Date;
}

export type DoubtDocument = HydratedDocument<Doubt>;

export const DoubtSchema = SchemaFactory.createForClass(Doubt);

DoubtSchema.index({ courseId: 1, status: 1, createdAt: 1 });
