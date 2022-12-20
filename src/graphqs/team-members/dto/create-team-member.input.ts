import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateTeamMemberInput {
  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  company: string;
}
