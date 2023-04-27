import { PrismaService } from 'nestjs-prisma';
import { Injectable } from '@nestjs/common';
import { Column } from './column.model';
import { ColumnWhereUniqueInput } from './dto/column-where-unique.input';
import { GraphQLResolveInfo } from 'graphql';
import { PrismaSelectService } from 'src/prisma-select.service';

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
}
