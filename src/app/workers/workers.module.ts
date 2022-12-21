import { Module } from '@nestjs/common';
import { WorkersService } from './workers.service';
import { WorkersController } from './workers.controller';
import { PersonModule } from '../person/person.module';

@Module({
  imports: [PersonModule],
  controllers: [WorkersController],
  providers: [WorkersService],
})
export class WorkersModule {}
