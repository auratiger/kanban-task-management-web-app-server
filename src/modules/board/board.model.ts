import 'reflect-metadata';
import { ObjectType, Field } from '@nestjs/graphql';
import { BaseModel } from 'src/common/models/base.model';
import { Column } from '../column/column.model';

@ObjectType()
export class Board extends BaseModel {
   @Field(() => String, { nullable: false })
   name: string;

   @Field(() => [Column], { nullable: false })
   columns: Array<Column>;
}
