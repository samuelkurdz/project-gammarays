import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { PersonModule } from '../person/person.module';

@Module({
  imports: [PersonModule],
  controllers: [TeamsController],
  providers: [TeamsService],
})
export class TeamsModule {}