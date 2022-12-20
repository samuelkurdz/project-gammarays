import { CreateTeamMemberInput } from './create-team-member.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTeamMemberInput extends PartialType(CreateTeamMemberInput) {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  password: string;
}
