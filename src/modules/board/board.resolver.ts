import { Resolver, Query, Mutation, Args, Info } from '@nestjs/graphql';
import { BoardService } from './board.service';
import { Board } from './board.model';
import { GraphQLResolveInfo } from 'graphql';
import { BoardWhereUniqueInput } from './dto/board-where-unique.input';

@Resolver(() => Board)
export class BoardResolver {
   constructor(private boardService: BoardService) {}

   @Query(() => Board)
   public async board(
      @Args('where') args: BoardWhereUniqueInput,
      @Info() info?: GraphQLResolveInfo,
   ) {
      return await this.boardService.getBoard(args, info);
   }
}
