import { Module } from '@nestjs/common';
import { CompanyModule } from './company/company.module';
import { WorkersModule } from './workers/workers.module';
import { TeamsModule } from './teams/teams.module';

@Module({
  imports: [CompanyModule, WorkersModule, TeamsModule],
  exports: [],
  controllers: [],
  // providers: [PersonService],
})
export class RestModule {}
