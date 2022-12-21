import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Apps } from 'src/global';

export type CompanyDocument = HydratedDocument<Company>;

@Schema()
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
export class Company {
  @Prop({ required: true, unique: true })
  companyName: string;

  @Prop({ required: true, unique: true })
  officialEmail: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    type: AppSchema,
    default: { teams: ['*'], workers: ['*'], events: ['*'], attendance: ['*'] },
  })
  apps: Apps;

  @Prop()
  category: 'education' | 'industrial' | 'community';

  @Prop()
  logo: string;

  @Prop()
  shortDestription: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
