import { Apps } from 'src/global';

export class CreateWorkerDto {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  password?: string;
  apps?: Apps;
}
