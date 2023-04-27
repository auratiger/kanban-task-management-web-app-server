import { Resolver, Query, Mutation, Args, Info } from '@nestjs/graphql';
import { SubtaskService } from './subtask.service';
import { Subtask } from './subtask.model';
import { SubtaskWhereUniqueInput } from './dto/subtask-where-unique.input';
import { GraphQLResolveInfo } from 'graphql';
import { FindManyArgs } from 'src/common/input/find-many.input';

@Resolver(() => Subtask)
export class SubtaskResolver {
   constructor(private subtaskService: SubtaskService) {}

   @Query(() => Subtask)
   public async subtask(
      @Args('where') args: SubtaskWhereUniqueInput,
      @Info() info?: GraphQLResolveInfo,
   ) {
      return await this.subtaskService.getSubtask(args, info);
   }

   @Query(() => [Subtask])
   public async subtasks(
      @Args() args: FindManyArgs,
      @Info() info?: GraphQLResolveInfo,
   ) {
      return await this.subtaskService.getSubtasks(args, info);
   }
}
