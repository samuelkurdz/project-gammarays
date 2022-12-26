import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, Types } from 'mongoose';
import { Apps } from 'src/global';

export type PersonDocument = HydratedDocument<Person>;

@Schema({ _id: false })
class AppSchema {
  @Prop()
  teams: string[];

  @Prop()
  events: string[];

  @Prop()
  workers: string[];

  @Prop()
  attendance: string[];
}

@Schema({ timestamps: { createdAt: true, updatedAt: true } })
export class Person {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, default: 'password' })
  password: string;

  @Prop({ required: true, type: Boolean })
  isWorker: boolean;

  @Prop({ required: true, ref: 'Company', type: Types.ObjectId })
  company: ObjectId;

  @Prop({
    type: AppSchema,
    default: {
      teams: [],
      workers: ['list-all'],
      events: ['list-all'],
      attendance: [],
    },
    required: true,
  })
  apps: Apps;
}

export const PersonSchema = SchemaFactory.createForClass(Person);
