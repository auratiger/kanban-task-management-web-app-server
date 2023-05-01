import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateTaskInput {
   @Field(() => String)
   @IsString()
   @IsNotEmpty()
   title: string;

   @Field(() => String)
   @IsString()
   description?: string;

   @Field(() => String, { defaultValue: 'NOT STARTED' })
   @IsString()
   status?: string;
}
