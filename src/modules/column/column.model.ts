import 'reflect-metadata';
import { ObjectType, Field } from '@nestjs/graphql';
import { BaseModel } from 'src/common/models/base.model';

@ObjectType()
export class Column extends BaseModel {
   @Field(() => String, { nullable: false })
   name: string;
}
