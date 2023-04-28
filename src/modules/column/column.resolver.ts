import { Resolver, Query, Mutation, Args, Info } from '@nestjs/graphql';
import { ColumnService } from './column.service';
import { Column } from './column.model';
import { GraphQLResolveInfo } from 'graphql';
import { ColumnWhereUniqueInput } from './dto/column-where-unique.input';
import { FindManyArgs } from 'src/common/input/find-many.input';
import { CreateColumnInput } from '../board/dto/create-column.input';

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

   @Query(() => [Column])
   public async columns(
      @Args() args: FindManyArgs,
      @Info() info?: GraphQLResolveInfo,
   ) {
      return await this.columnService.getColumns(args, info);
   }

   /* istanbul ignore next */
   /* Mutations */
   @Mutation(() => Column)
   public async createColumn(@Args('data') data: CreateColumnInput) {
      return await this.columnService.createColumn(data);
   }

   /* istanbul ignore next */
   @Mutation(() => [Column])
   public async createColumns(
      @Args({ name: 'data', type: () => [CreateColumnInput] })
      data: CreateColumnInput[],
   ) {
      return await this.columnService.createColumns(data);
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
   @Mutation(() => Column)
   public async deleteColumn(@Args('where') where: ColumnWhereUniqueInput) {
      return await this.columnService.deleteColumn(where);
   }
}
