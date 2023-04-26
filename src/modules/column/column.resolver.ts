import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ColumnService } from './column.service';
import { Column } from './column.model';

@Resolver(() => Column)
export class ColumnResolver {
   constructor(private boardService: ColumnService) {}

   @Query(() => [Column])
   async boards() {
      return this.boardService.findById('');
   }
}
