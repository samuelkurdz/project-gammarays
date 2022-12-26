import { Types } from 'mongoose';

export interface IOccurrence {
  title: string;
  description: string;
  venue: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  company: {
    _id: Types.ObjectId;
    companyName: string;
  };
  createdBy: string;
  rate?: {
    name: string;
    value: number;
    rateType: string;
    breaks: number;
    isCurrency: boolean;
    unitType: string;
  };
  teams?: any[];
  workers?: any[];
}
