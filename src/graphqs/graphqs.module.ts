import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TeamMembersModule } from './team-members/team-members.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
      // path: '/graphi',
    }),
    TeamMembersModule,
  ],
  exports: [],
  controllers: [],
  providers: [],
})
export class GraphqsModule {}
