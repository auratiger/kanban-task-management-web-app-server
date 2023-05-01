import { Resolver, Query, Mutation, Args, Info } from '@nestjs/graphql';
import { SubtaskService } from './subtask.service';
import { Subtask } from './subtask.model';
import { SubtaskWhereUniqueInput } from './dto/subtask-where-unique.input';
import { GraphQLResolveInfo } from 'graphql';
import { FindManyArgs } from 'src/common/input/find-many.input';
import { CreateSubtaskInput } from '../board/dto/create-subtask.input';

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

   /* istanbul ignore next */
   /* Mutations */
   @Mutation(() => Subtask)
   public async createSubtask(@Args('data') data: CreateSubtaskInput) {
      return await this.subtaskService.createSubtask(data);
   }

   /* istanbul ignore next */
   @Mutation(() => [Subtask])
   public async createSubtasks(
      @Args({ name: 'data', type: () => [CreateSubtaskInput] })
      data: CreateSubtaskInput[],
   ) {
      return await this.subtaskService.createSubtasks(data);
   }

   // /* istanbul ignore next */
   // @Mutation(() => Column)
   // public async updateColumn(
   //    @Args('where') where: ColumnWhereUniqueInput,
   //    @Args('data') data: UpdateColumnInput,
   // ) {
   //    return await this.columnService.updateColumn(where, data);
   // }

   /* istanbul ignore next */
   @Mutation(() => Subtask)
   public async deleteSubtask(@Args('where') where: SubtaskWhereUniqueInput) {
      return await this.subtaskService.deleteSubtask(where);
   }
}
