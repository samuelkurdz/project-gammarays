import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Apps } from 'src/global';

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

    if (apps.attendance.includes('*')) {
      can(Actions.Manage, Subjects.All);
    }

    return build({
      detectSubjectType: (item) => item as ExtractSubjectType<Subjects>,
    });
  }
}
