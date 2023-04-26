import 'reflect-metadata';
import { ObjectType, Field } from '@nestjs/graphql';
import { BaseModel } from 'src/common/models/base.model';

@ObjectType()
export class Subtask extends BaseModel {
   @Field(() => String, { nullable: false })
   title: string;

   @Field(() => Boolean, { defaultValue: false })
   isComplete: boolean;
}
