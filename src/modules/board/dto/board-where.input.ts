import { Field, InputType } from '@nestjs/graphql';
import { DateTimeFilter } from 'src/common/input/date-time-filter.input';
import { StringFilter } from 'src/common/input/string-filter.input';

@InputType()
export class BoardWhereInput {
   @Field(() => [BoardWhereInput], {
      nullable: true,
   })
   AND?: Array<BoardWhereInput>;

   @Field(() => [BoardWhereInput], {
      nullable: true,
   })
   OR?: Array<BoardWhereInput>;

   @Field(() => [BoardWhereInput], {
      nullable: true,
   })
   NOT?: Array<BoardWhereInput>;

   @Field(() => StringFilter, {
      nullable: true,
   })
   id?: StringFilter;

   @Field(() => DateTimeFilter, {
      nullable: true,
   })
   createdAt?: DateTimeFilter;

   @Field(() => DateTimeFilter, {
      nullable: true,
   })
   updatedAt?: DateTimeFilter;
}
