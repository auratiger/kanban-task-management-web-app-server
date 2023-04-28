import { PrismaService } from 'nestjs-prisma';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ColumnWhereUniqueInput } from './dto/column-where-unique.input';
import { GraphQLResolveInfo } from 'graphql';
import { PrismaSelectService } from 'src/prisma-select.service';
import { FindManyArgs } from 'src/common/input/find-many.input';
import { CreateColumnInput } from '../board/dto/create-column.input';
import { Column, Prisma } from '@prisma/client';

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

   public async createColumn(columnInput: CreateColumnInput) {
      try {
         const data: Prisma.ColumnCreateInput = {
            ...columnInput,
         };

         return await this.prisma.column.create({
            data,
         });
      } catch (error) {
         if (error.status) {
            throw error;
         }
         throw new HttpException(
            error.message,
            HttpStatus.INTERNAL_SERVER_ERROR,
         );
      }
   }

   public async createColumns(columns: CreateColumnInput[] = []) {
      const result: Column[] = [];
      try {
         for (const column of columns) {
            const newColumn = await this.createColumn(column);
            result.push(newColumn);
         }
         return result;
      } catch (error) {
         throw new HttpException(
            error.message,
            HttpStatus.INTERNAL_SERVER_ERROR,
         );
      }
   }

   public async deleteColumn(where: ColumnWhereUniqueInput): Promise<Column> {
      try {
         return await this.prisma.column.delete({ where });
      } catch (error) {
         throw new HttpException(
            error.message,
            HttpStatus.INTERNAL_SERVER_ERROR,
         );
      }
   }
}
