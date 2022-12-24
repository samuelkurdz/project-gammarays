import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Apps, appsRelations } from 'src/global';

export enum Actions {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
}

export enum Subjects {
  Company = 'company',
  Teams = 'teams',
  Workers = 'workers',
  Events = 'events',
  All = 'all',
}

// type Subjects = InferSubjects<typeof Article | typeof User> | 'all';

export type AppAbility = Ability<[Actions, Subjects]>;

@Injectable()
export class AbilityFactory {
  defineAbility(apps: Apps) {
    const { can, build } = new AbilityBuilder(
      Ability as AbilityClass<AppAbility>,
    );

    if (
      apps.teams &&
      (apps.teams.includes(appsRelations.teams.masterAccess) ||
        apps.teams.includes(appsRelations.teams.listAllAccess))
    ) {
      can(Actions.Read, Subjects.Teams);
    }

    return build({
      detectSubjectType: (item) => item as ExtractSubjectType<Subjects>,
    });
  }
}
