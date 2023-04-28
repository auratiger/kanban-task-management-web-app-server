import { PrismaService } from 'nestjs-prisma';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { BoardWhereUniqueInput } from './dto/board-where-unique.input';
import { GraphQLResolveInfo } from 'graphql';
import { PrismaSelectService } from 'src/prisma-select.service';
import { FindManyArgs } from 'src/common/input/find-many.input';
import { CreateBoardInput } from './dto/create-board.input';
import { ColumnService } from '../column/column.service';
import { Board, Column, Prisma } from '@prisma/client';

@Injectable()
export class BoardService {
   constructor(
      private prisma: PrismaService,
      private columnService: ColumnService,
      private prismaSelectService: PrismaSelectService,
   ) {}

   public async getBoard(
      args: BoardWhereUniqueInput,
      info?: GraphQLResolveInfo,
   ) {
      const select = this.prismaSelectService.getValue(info);
      return await this.prisma.board.findUnique({
         ...select,
         where: args,
      });
   }

   public async getBoards(args: FindManyArgs, info?: GraphQLResolveInfo) {
      // Prisma Select to solve N+1 graphql problem
      const select = this.prismaSelectService.getValue(info);
      return await this.prisma.board.findMany({
         ...args,
         ...select,
      });
   }

   public async craeteBoard(input: CreateBoardInput) {
      try {
         // Get or create category from input
         const columns: Array<Column> = await this.columnService.createColumns(
            input.columns,
         );

         const data: Prisma.BoardCreateInput = {
            ...input,
            columns: {
               connect: columns.map((c) => ({ id: c.id })),
            },
         };

         const post = await this.prisma.board.create({
            data,
            select: {
               id: true,
               name: true,
               columns: true,
            },
         });

         console.log(JSON.stringify(post));

         return post;
      } catch (error) {
         throw new HttpException(
            error.message,
            HttpStatus.INTERNAL_SERVER_ERROR,
         );
      }
   }

   public async deleteBoard(where: BoardWhereUniqueInput): Promise<Board> {
      try {
         return await this.prisma.board.delete({ where });
      } catch (error) {
         throw new HttpException(
            error.message,
            HttpStatus.INTERNAL_SERVER_ERROR,
         );
      }
   }
}
