import { PrismaService } from 'nestjs-prisma';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaSelectService } from 'src/prisma-select.service';
import { GraphQLResolveInfo } from 'graphql';
import { SubtaskWhereUniqueInput } from './dto/subtask-where-unique.input';
import { FindManyArgs } from 'src/common/input/find-many.input';
import { CreateSubtaskInput } from '../board/dto/create-subtask.input';
import { Prisma, Subtask } from '@prisma/client';

@Injectable()
export class SubtaskService {
   constructor(
      private prisma: PrismaService,
      private prismaSelectService: PrismaSelectService,
   ) {}

   public async getSubtask(
      args: SubtaskWhereUniqueInput,
      info?: GraphQLResolveInfo,
   ) {
      const select = this.prismaSelectService.getValue(info);
      return await this.prisma.subtask.findUnique({
         ...select,
         where: args,
      });
   }

   public async getSubtasks(args: FindManyArgs, info?: GraphQLResolveInfo) {
      // Prisma Select to solve N+1 graphql problem
      const select = this.prismaSelectService.getValue(info);
      return await this.prisma.subtask.findMany({
         ...args,
         ...select,
      });
   }

   public async createSubtask(taskInput: CreateSubtaskInput) {
      try {
         const data: Prisma.SubtaskCreateInput = {
            ...taskInput,
         };

         return await this.prisma.subtask.create({
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

   public async createSubtasks(subtasks: CreateSubtaskInput[] = []) {
      const result: Subtask[] = [];
      try {
         for (const subtask of subtasks) {
            const newSubtask = await this.createSubtask(subtask);
            result.push(newSubtask);
         }
         return result;
      } catch (error) {
         throw new HttpException(
            error.message,
            HttpStatus.INTERNAL_SERVER_ERROR,
         );
      }
   }

   public async deleteSubtask(
      where: SubtaskWhereUniqueInput,
   ): Promise<Subtask> {
      try {
         return await this.prisma.subtask.delete({ where });
      } catch (error) {
         throw new HttpException(
            error.message,
            HttpStatus.INTERNAL_SERVER_ERROR,
         );
      }
   }
}
