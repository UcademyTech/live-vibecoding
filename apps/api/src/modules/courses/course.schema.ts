import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EVertical } from '@live/shared';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Course {
  _id: Types.ObjectId;

  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, enum: Object.values(EVertical) })
  vertical: EVertical;

  @Prop({ required: true, index: true })
  teacherId: string;

  createdAt: Date;

  updatedAt: Date;
}

export type CourseDocument = HydratedDocument<Course>;

export const CourseSchema = SchemaFactory.createForClass(Course);
