import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestModule } from './rest/rest.module';
import { GraphqsModule } from './graphqs/graphqs.module';

@Module({
  imports: [RestModule, GraphqsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
