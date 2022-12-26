import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, LeanDocument, Types } from 'mongoose';
import { IOccurrence } from './entities/occurrence.entity';

export type OccurenceDocument = HydratedDocument<IOccurrence>;
export type LeanOccurenceDocument = LeanDocument<OccurenceDocument>;

@Schema()
class RateSchema {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: Number })
  value: number;

  @Prop({ enum: ['daily', 'hourly', 'piece'], required: true })
  rateType: string;

  @Prop({ type: Number, default: 0 })
  breaks: number;

  @Prop({ type: Boolean, default: false })
  isCurrency: boolean;

  @Prop({
    required: true,
    default: 'points',
    enum: ['USD', 'EUR', 'GBP', 'NGN', 'CAD', 'points'],
  })
  unitType: string;
}

@Schema({ timestamps: { createdAt: true, updatedAt: true } })
export class Occurence {
  @Prop({ required: true, type: String })
  title: string;

  @Prop({ type: String })
  description: string;

  @Prop({ required: true, type: String })
  venue: string;

  @Prop({ required: true, type: String })
  eventDate: string;

  @Prop({ required: true, type: String })
  startTime: string;

  @Prop({ required: true, type: String })
  endTime: string;

  // auto from creator's company
  @Prop({ required: true, ref: 'Company', type: Types.ObjectId })
  company: string;

  @Prop({ required: true, ref: 'Person', type: Types.ObjectId })
  createdBy: string;

  @Prop({ type: RateSchema })
  rate?: RateSchema;

  @Prop({ ref: 'Person', type: [Types.ObjectId] })
  teams?: [string];

  @Prop({ ref: 'Person', type: [Types.ObjectId] })
  workers?: [string];
}

export const OccurenceSchema = SchemaFactory.createForClass(Occurence);
