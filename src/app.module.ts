import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestModule } from './rest/rest.module';
import { GraphqsModule } from './graphqs/graphqs.module';
import { MongooseModule } from '@nestjs/mongoose';

const adminCred = {
  username: 'smartAttAdmin',
  password: 'R1uqMaOEZq70PeDa',
};
@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://${adminCred.username}:${adminCred.password}@cluster0.dcm45p7.mongodb.net/?retryWrites=true&w=majority`,
    ),
    RestModule,
    GraphqsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
