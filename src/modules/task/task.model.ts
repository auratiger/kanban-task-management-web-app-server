import 'reflect-metadata';
import { ObjectType, Field } from '@nestjs/graphql';
import { BaseModel } from 'src/common/models/base.model';
import { Subtask } from '../subtask/subtask.model';

@ObjectType()
export class Task extends BaseModel {
   @Field(() => String, { nullable: false })
   title: string;

   @Field(() => String, { nullable: true })
   description?: string;

   @Field(() => String, { defaultValue: 'NOT STARTED' })
   status?: string;

   @Field(() => [Subtask], { nullable: false, defaultValue: [] })
   subtasks?: Array<Subtask>;
}
