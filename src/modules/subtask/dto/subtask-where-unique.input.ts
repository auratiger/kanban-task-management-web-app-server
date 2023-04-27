import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SubtaskWhereUniqueInput {
   @Field(() => String, {
      nullable: true,
   })
   id?: string;
}
