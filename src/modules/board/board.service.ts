import { PrismaService } from 'nestjs-prisma';
import { Injectable } from '@nestjs/common';
import { Board } from './board.model';

@Injectable()
export class BoardService {
   constructor(private prisma: PrismaService) {}

   async findAll(): Promise<Board[]> {
      return this.prisma.board.findMany();
   }

   async findById(boardId: string): Promise<Board | undefined> {
      return this.prisma.board.findUnique({
         where: {
            id: boardId,
         },
      });
   }
}
