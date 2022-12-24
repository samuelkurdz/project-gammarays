import { Module } from '@nestjs/common';
import { WorkersService } from './workers.service';
import { WorkersController } from './workers.controller';
import { PersonModule } from '../person/person.module';
import { AbilityModule } from 'src/ability/ability.module';
import { AuthModule } from 'src/auth';

@Module({
  imports: [PersonModule, AuthModule, AbilityModule],
  controllers: [WorkersController],
  providers: [WorkersService],
})
export class WorkersModule {}
