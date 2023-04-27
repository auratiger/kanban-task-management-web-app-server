import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TaskWhereUniqueInput {
   @Field(() => String, {
      nullable: true,
   })
   id?: string;

   @Field(() => String, {
      nullable: true,
   })
   title?: string;
}
