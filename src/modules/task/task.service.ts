import { PrismaService } from 'nestjs-prisma';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Task } from './task.model';
import { PrismaSelectService } from 'src/prisma-select.service';
import { GraphQLResolveInfo } from 'graphql';
import { TaskWhereUniqueInput } from './dto/task-where-unique.input';
import { FindManyArgs } from 'src/common/input/find-many.input';
import { CreateTaskInput } from '../board/dto/create-task.input';
import { Prisma } from '@prisma/client';

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
      });
   }

   public async getTasks(args: FindManyArgs, info?: GraphQLResolveInfo) {
      // Prisma Select to solve N+1 graphql problem
      const select = this.prismaSelectService.getValue(info);
      return await this.prisma.task.findMany({
         ...args,
         ...select,
      });
   }

   public async createTask(taskInput: CreateTaskInput) {
      try {
         const data: Prisma.TaskCreateInput = {
            ...taskInput,
         };

         return await this.prisma.task.create({
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

   public async createTasks(tasks: CreateTaskInput[] = []) {
      const result: Task[] = [];
      try {
         for (const task of tasks) {
            const newTask = await this.createTask(task);
            result.push(newTask);
         }
         return result;
      } catch (error) {
         throw new HttpException(
            error.message,
            HttpStatus.INTERNAL_SERVER_ERROR,
         );
      }
   }

   public async deleteTask(where: TaskWhereUniqueInput): Promise<Task> {
      try {
         return await this.prisma.task.delete({ where });
      } catch (error) {
         throw new HttpException(
            error.message,
            HttpStatus.INTERNAL_SERVER_ERROR,
         );
      }
   }
}
