import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Subtask } from './subtask.model';
import { SubtaskService } from './subtask.service';

@Resolver(() => Subtask)
export class SubtaskResolver {
   constructor(private boardService: SubtaskService) {}

   @Query(() => [Subtask])
   async boards() {
      return this.boardService.findAll();
   }
}
