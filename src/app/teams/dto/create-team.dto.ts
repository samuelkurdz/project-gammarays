import { Apps } from 'src/global';

export class CreateTeamDto {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  password?: string;
  apps?: Apps;
}
