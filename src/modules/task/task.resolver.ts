import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Task } from './task.model';
import { TaskService } from './task.service';

@Resolver(() => Task)
export class TaskResolver {
   constructor(private boardService: TaskService) {}

   @Query(() => [Task])
   async boards() {
      return this.boardService.findAll();
   }
}
