import { Apps, appsRelations } from 'src/global';

export class CreateTeamDto {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  password: string;
  apps?: Apps;
}

export const createTeamMemberDefaultApps: Apps = {
  teams: [appsRelations.teams.listAllAccess],
  workers: [appsRelations.workers.listAllAccess],
  events: [appsRelations.events.listAllAccess],
  attendance: [],
};
