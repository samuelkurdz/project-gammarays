import { Module } from '@nestjs/common';
import { CompanyModule } from './company/company.module';
import { WorkersModule } from './workers/workers.module';
import { TeamsModule } from './teams/teams.module';
import { OccurrencesModule } from './occurrences/occurrences.module';
import { AttendanceModule } from './attendance/attendance.module';

@Module({
  imports: [
    CompanyModule,
    WorkersModule,
    TeamsModule,
    OccurrencesModule,
    AttendanceModule,
  ],
  exports: [],
  controllers: [],
  // providers: [PersonService],
})
export class RestModule {}
