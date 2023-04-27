import { PrismaService } from 'nestjs-prisma';
import { Injectable } from '@nestjs/common';
import { Subtask } from './subtask.model';
import { PrismaSelectService } from 'src/prisma-select.service';
import { GraphQLResolveInfo } from 'graphql';
import { SubtaskWhereUniqueInput } from './dto/subtask-where-unique.input';

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
}
