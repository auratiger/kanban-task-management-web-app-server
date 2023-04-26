import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Column } from './column.model';
import { ColumnService } from './column.service';

@Resolver(() => Column)
export class ColumnResolver {
   constructor(private boardService: ColumnService) {}

   @Query(() => [Column])
   async boards() {
      return this.boardService.findAll();
   }
}
