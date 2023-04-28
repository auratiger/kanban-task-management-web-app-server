import { Field, InputType } from '@nestjs/graphql';
import { ArrayUnique, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateColumnInput } from './create-column.input';

@InputType()
export class CreateBoardInput {
   @Field(() => String)
   @IsString()
   @IsNotEmpty()
   name: string;

   @Field(() => [CreateColumnInput], { nullable: true })
   @ArrayUnique()
   @IsOptional()
   columns?: CreateColumnInput[];
}
