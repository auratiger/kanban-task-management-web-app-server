import 'reflect-metadata';
import { ObjectType, Field } from '@nestjs/graphql';
import { BaseModel } from 'src/common/models/base.model';
import { Board } from 'src/modules/boards/board.model';
import { Task } from 'src/modules/task/task.model';

@ObjectType()
export class Column extends BaseModel {
   @Field(() => String, { nullable: false })
   name: string;

   @Field(() => Board, { nullable: false })
   board: Board;

   @Field(() => [Task], { nullable: false })
   tasks: Array<Task>;
}
