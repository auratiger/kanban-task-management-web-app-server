import { Resolver, Query, Mutation, Args, Info } from '@nestjs/graphql';
import { BoardService } from './board.service';
import { Board } from './board.model';
import { GraphQLResolveInfo } from 'graphql';
import { BoardWhereUniqueInput } from './dto/board-where-unique.input';
import { FindManyArgs } from 'src/common/input/find-many.input';
import { CreateBoardInput } from './dto/create-board.input';

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

   @Query(() => [Board])
   public async boards(
      @Args() args: FindManyArgs,
      @Info() info?: GraphQLResolveInfo,
   ) {
      return await this.boardService.getBoards(args, info);
   }

   /* Mutations */
   @Mutation(() => Board)
   public async createBoard(@Args('data') input: CreateBoardInput) {
      return await this.boardService.craeteBoard(input);
   }

   // @Mutation(() => Board)
   // public async updatePost(
   //    @Args('where') where: PostWhereUniqueInput,
   //    @Args('data') data: UpdatePostInput,
   // ) {
   //    return await this.boardService.updatePost(where, data);
   // }

   @Mutation(() => Board)
   public async deletePost(@Args('where') where: BoardWhereUniqueInput) {
      return await this.boardService.deleteBoard(where);
   }
}
