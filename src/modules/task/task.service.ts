import { PrismaService } from 'nestjs-prisma';
import { Injectable } from '@nestjs/common';
import { Task } from './task.model';

@Injectable()
export class TaskService {
   constructor(private prisma: PrismaService) {}

   async findAll(): Promise<Task[]> {
      return this.prisma.task.findMany();
   }

   async findById(boardId: string): Promise<Task | undefined> {
      return this.prisma.task.findUnique({
         where: {
            id: boardId,
         },
      });
   }
}
