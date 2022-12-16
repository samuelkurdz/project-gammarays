import { Module } from '@nestjs/common';
import { TeamMembersModule } from './team-members/team-members.module';

@Module({
  imports: [TeamMembersModule],
  exports: [TeamMembersModule],
  controllers: [],
  providers: [],
})
export class GraphqsModule {}
