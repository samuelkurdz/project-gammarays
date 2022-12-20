import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class TeamMemberCompany {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  logo: string;

  @Field(() => String)
  companyName: string;

  @Field(() => String)
  category: string;

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;

  @Field(() => String)
  shortDestription: string;
}

@ObjectType()
export class TeamMember {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;

  @Field(() => TeamMemberCompany)
  company: TeamMemberCompany;
}
