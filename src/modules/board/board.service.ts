import { PrismaService } from 'nestjs-prisma';
import { Injectable } from '@nestjs/common';
import { Board } from './board.model';

@Injectable()
export class BoardService {
   constructor(private prisma: PrismaService) {}

   async findById(boardId: string): Promise<Board | undefined> {
      return this.prisma.board.findUnique({
         include: { columns: true },
         where: {
            id: boardId,
         },
      });
   }
}
