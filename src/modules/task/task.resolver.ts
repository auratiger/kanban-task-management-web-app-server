import { Resolver, Query, Mutation, Args, Info } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { Task } from './task.model';
import { TaskWhereUniqueInput } from './dto/task-where-unique.input';
import { GraphQLResolveInfo } from 'graphql';
import { FindManyArgs } from 'src/common/input/find-many.input';
import { CreateTaskInput } from '../board/dto/create-task.input';

@Resolver(() => Task)
export class TaskResolver {
   constructor(private taskService: TaskService) {}

   @Query(() => Task)
   public async task(
      @Args('where') args: TaskWhereUniqueInput,
      @Info() info?: GraphQLResolveInfo,
   ) {
      return await this.taskService.getTask(args, info);
   }

   @Query(() => [Task])
   public async tasks(
      @Args() args: FindManyArgs,
      @Info() info?: GraphQLResolveInfo,
   ) {
      return await this.taskService.getTasks(args, info);
   }

   /* istanbul ignore next */
   /* Mutations */
   @Mutation(() => Task)
   public async createTask(@Args('data') data: CreateTaskInput) {
      return await this.taskService.createTask(data);
   }

   /* istanbul ignore next */
   @Mutation(() => [Task])
   public async createTasks(
      @Args({ name: 'data', type: () => [CreateTaskInput] })
      data: CreateTaskInput[],
   ) {
      return await this.taskService.createTasks(data);
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
   @Mutation(() => Task)
   public async deleteTask(@Args('where') where: TaskWhereUniqueInput) {
      return await this.taskService.deleteTask(where);
   }
}
