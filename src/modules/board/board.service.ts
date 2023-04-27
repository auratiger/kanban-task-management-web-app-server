import { PrismaService } from 'nestjs-prisma';
import { Injectable } from '@nestjs/common';
import { BoardWhereUniqueInput } from './dto/board-where-unique.input';
import { GraphQLResolveInfo } from 'graphql';
import { PrismaSelectService } from 'src/prisma-select.service';
import { FindManyArgs } from 'src/common/input/find-many.input';

@Injectable()
export class BoardService {
   constructor(
      private prisma: PrismaService,
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
}
