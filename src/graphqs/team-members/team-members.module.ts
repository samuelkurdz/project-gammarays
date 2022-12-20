import { Module } from '@nestjs/common';
import { TeamMembersService } from './team-members.service';
import { TeamMembersResolver } from './team-members.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { TeamMember, TeamMemberSchema } from './team-members.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TeamMember.name, schema: TeamMemberSchema },
    ]),
  ],
  providers: [TeamMembersResolver, TeamMembersService],
})
export class TeamMembersModule {}
