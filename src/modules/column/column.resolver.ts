import { Resolver, Query, Mutation, Args, Info } from '@nestjs/graphql';
import { ColumnService } from './column.service';
import { Column } from './column.model';
import { GraphQLResolveInfo } from 'graphql';
import { ColumnWhereUniqueInput } from './dto/column-where-unique.input';

@Resolver(() => Column)
export class ColumnResolver {
   constructor(private columnService: ColumnService) {}

   @Query(() => Column)
   public async column(
      @Args('where') args: ColumnWhereUniqueInput,
      @Info() info?: GraphQLResolveInfo,
   ) {
      return await this.columnService.getColumn(args, info);
   }
}
