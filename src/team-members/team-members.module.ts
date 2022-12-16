import { Module } from '@nestjs/common';
import { TeamMembersService } from './team-members.service';
import { TeamMembersResolver } from './team-members.resolver';

@Module({
  providers: [TeamMembersResolver, TeamMembersService],
})
export class TeamMembersModule {}
