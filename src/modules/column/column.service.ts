import { PrismaService } from 'nestjs-prisma';
import { Injectable } from '@nestjs/common';
import { ColumnWhereUniqueInput } from './dto/column-where-unique.input';
import { GraphQLResolveInfo } from 'graphql';
import { PrismaSelectService } from 'src/prisma-select.service';
import { FindManyArgs } from 'src/common/input/find-many.input';

@Injectable()
export class ColumnService {
   constructor(
      private prisma: PrismaService,
      private prismaSelectService: PrismaSelectService,
   ) {}

   public async getColumn(
      args: ColumnWhereUniqueInput,
      info?: GraphQLResolveInfo,
   ) {
      const select = this.prismaSelectService.getValue(info);
      return await this.prisma.column.findUnique({
         ...select,
         where: args,
      });
   }

   public async getColumns(args: FindManyArgs, info?: GraphQLResolveInfo) {
      // Prisma Select to solve N+1 graphql problem
      const select = this.prismaSelectService.getValue(info);
      return await this.prisma.column.findMany({
         ...args,
         ...select,
      });
   }
}
