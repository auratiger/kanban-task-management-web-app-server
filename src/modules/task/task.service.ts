import { PrismaService } from 'nestjs-prisma';
import { Injectable } from '@nestjs/common';
import { Task } from './task.model';
import { PrismaSelectService } from 'src/prisma-select.service';
import { GraphQLResolveInfo } from 'graphql';
import { TaskWhereUniqueInput } from './dto/task-where-unique.input';

@Injectable()
export class TaskService {
   constructor(
      private prisma: PrismaService,
      private prismaSelectService: PrismaSelectService,
   ) {}

   public async getTask(args: TaskWhereUniqueInput, info?: GraphQLResolveInfo) {
      const select = this.prismaSelectService.getValue(info);
      return await this.prisma.task.findUnique({
         ...select,
         where: args,
         rejectOnNotFound: true,
      });
   }
}
