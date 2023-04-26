import { PrismaService } from 'nestjs-prisma';
import { Injectable } from '@nestjs/common';
import { Subtask } from './subtask.model';

@Injectable()
export class SubtaskService {
   constructor(private prisma: PrismaService) {}

   async findAll(): Promise<Subtask[]> {
      return this.prisma.subtask.findMany();
   }

   async findById(boardId: string): Promise<Subtask | undefined> {
      return this.prisma.subtask.findUnique({
         where: {
            id: boardId,
         },
      });
   }
}
