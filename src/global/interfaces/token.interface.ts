import { Apps } from './apps.interface';

export interface Token {
  _id: string;
  email: string;
  isWorker: boolean;
  company: string;
  apps: Apps;
}
