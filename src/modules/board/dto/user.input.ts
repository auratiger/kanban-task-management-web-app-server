import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetUserInput {
   @Field(() => String, { nullable: false })
   id: string;
}
