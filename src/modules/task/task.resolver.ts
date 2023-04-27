import { Resolver, Query, Mutation, Args, Info } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { Task } from './task.model';
import { TaskWhereUniqueInput } from './dto/task-where-unique.input';
import { GraphQLResolveInfo } from 'graphql';

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
}
