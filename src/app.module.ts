import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestModule } from './rest/rest.module';
import { GraphqsModule } from './graphqs/graphqs.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
      // path: '/graphi',
    }),
    RestModule,
    GraphqsModule,
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
