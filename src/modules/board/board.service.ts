import { PrismaService } from 'nestjs-prisma';
import { Injectable } from '@nestjs/common';
import { Board } from './board.model';
import { BoardWhereUniqueInput } from './dto/board-where-unique.input';
import { GraphQLResolveInfo } from 'graphql';
import { PrismaSelectService } from 'src/prisma-select.service';

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
}
