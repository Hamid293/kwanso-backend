import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type TaskDocument = Task & Document;

@Schema({ versionKey: false })
export class Task {
  @ApiProperty()
  _id: Types.ObjectId;

  @ApiProperty()
  @Prop({ required: true })
  name: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
