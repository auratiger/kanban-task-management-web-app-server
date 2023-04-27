import { Resolver, Query, Mutation, Args, Info } from '@nestjs/graphql';
import { SubtaskService } from './subtask.service';
import { Subtask } from './subtask.model';
import { SubtaskWhereUniqueInput } from './dto/subtask-where-unique.input';
import { GraphQLResolveInfo } from 'graphql';

@Resolver(() => Subtask)
export class SubtaskResolver {
   constructor(private subtaskService: SubtaskService) {}

   @Query(() => Subtask)
   public async post(
      @Args('where') args: SubtaskWhereUniqueInput,
      @Info() info?: GraphQLResolveInfo,
   ) {
      return await this.subtaskService.getSubtask(args, info);
   }
}
