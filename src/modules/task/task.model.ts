import 'reflect-metadata';
import { ObjectType, Field } from '@nestjs/graphql';
import { BaseModel } from 'src/common/models/base.model';
import { Subtask } from 'src/modules/subtask/subtask.model';
import { Column } from 'src/modules/column/column.model';

@ObjectType()
export class Task extends BaseModel {
   @Field(() => String, { nullable: false })
   title: string;

   @Field(() => String, { nullable: true })
   description?: string;

   @Field(() => String, { defaultValue: 'NOT STARTED' })
   status: string;

   @Field(() => Column, { nullable: false })
   column: Column;

   @Field(() => [Subtask], { nullable: false })
   subtasks: Array<Subtask>;
}
