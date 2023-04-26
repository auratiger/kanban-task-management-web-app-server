import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BoardService } from './board.service';
import { Board } from './board.model';

@Resolver(() => Board)
export class BoardResolver {
   constructor(private boardService: BoardService) {}

   @Query(() => [Board])
   async boards() {
      return this.boardService.findById('');
   }
}
