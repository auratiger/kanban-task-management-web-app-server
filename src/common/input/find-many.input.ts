import { ArgsType, Field, Int } from '@nestjs/graphql';
import { BoardWhereInput } from '../../modules/board/dto/board-where.input';

@ArgsType()
export class FindManyArgs {
   @Field(() => BoardWhereInput, {
      nullable: true,
   })
   where?: BoardWhereInput;
}
