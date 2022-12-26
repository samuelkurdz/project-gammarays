import { Apps } from './apps.interface';

export interface ILoggedInUser {
  _id: string;
  email: string;
  isWorker: boolean;
  company: string;
  apps: Apps;
}
