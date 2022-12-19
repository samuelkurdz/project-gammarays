import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CompanyDocument = HydratedDocument<Company>;

@Schema({ timestamps: { createdAt: true, updatedAt: true } })
export class Company {
  @Prop({ required: true, unique: true })
  companyName: string;

  @Prop({ required: true, unique: true })
  officialEmail: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  category: 'education' | 'industrial' | 'community';

  @Prop()
  logo: string;

  @Prop()
  shortDestription: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
