import { Module } from '@nestjs/common';
import { ColumnResolver } from './column.resolver';
import { ColumnService } from './column.service';
import { PrismaModuleTest } from 'src/prisma.module';

@Module({
   imports: [PrismaModuleTest],
   providers: [ColumnResolver, ColumnService],
})
export class ColumnModule {}
