import { Module } from '@nestjs/common';
import { OccurrencesService } from './occurrences.service';
import { OccurrencesController } from './occurrences.controller';
import { Occurence, OccurenceSchema } from './occurence.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AbilityModule } from 'src/ability/ability.module';
import { AuthModule } from 'src/auth';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Occurence.name, schema: OccurenceSchema },
    ]),
    AuthModule,
    AbilityModule,
  ],
  controllers: [OccurrencesController],
  providers: [OccurrencesService],
})
export class OccurrencesModule {}
