import { Apps, appsRelations } from 'src/global';

export class CreateWorkerDto {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  password?: string;
  apps?: Apps;
}

export const createWorkerDefaultApps: Apps = {
  workers: [appsRelations.workers.listWorkerAccess],
  events: [appsRelations.events.listWorkerAccess],
  attendance: [appsRelations.attendance.listWorkerAccess],
};
