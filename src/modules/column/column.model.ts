import 'reflect-metadata';
import { ObjectType, Field } from '@nestjs/graphql';
import { BaseModel } from 'src/common/models/base.model';
import { Task } from '../task/task.model';
import { Board } from '../board/board.model';

@ObjectType()
export class Column extends BaseModel {
   @Field(() => String, { nullable: false })
   name: string;

   @Field(() => Board, { nullable: false })
   board: Board;

   @Field(() => [Task], { nullable: false })
   tasks: Array<Task>;
}
