import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { PersonModule } from '../person/person.module';
import { AbilityModule } from 'src/ability/ability.module';

@Module({
  imports: [PersonModule, AbilityModule],
  controllers: [TeamsController],
  providers: [TeamsService],
})
export class TeamsModule {}
