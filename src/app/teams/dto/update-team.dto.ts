import { PartialType } from '@nestjs/mapped-types';
import { Apps } from 'src/global';
import { CreateTeamDto } from './create-team.dto';

export class UpdateTeamDto extends PartialType(CreateTeamDto) {
  password: string;
  apps: Apps;
}
