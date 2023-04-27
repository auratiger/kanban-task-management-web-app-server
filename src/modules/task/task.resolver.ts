import { Resolver, Query, Mutation, Args, Info } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { Task } from './task.model';
import { TaskWhereUniqueInput } from './dto/task-where-unique.input';
import { GraphQLResolveInfo } from 'graphql';
import { FindManyArgs } from 'src/common/input/find-many.input';

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
}
