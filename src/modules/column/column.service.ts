import { PrismaService } from 'nestjs-prisma';
import { Injectable } from '@nestjs/common';
import { Column } from './column.model';

@Injectable()
export class ColumnService {
   constructor(private prisma: PrismaService) {}

   async findById(columnId: string): Promise<Column | undefined> {
      return this.prisma.column.findUnique({
         where: {
            id: columnId,
         },
      });
   }
}
