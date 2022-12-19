import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestModule } from './rest/rest.module';
import { GraphqsModule } from './graphqs/graphqs.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

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
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
