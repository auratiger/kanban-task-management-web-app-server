import { Module } from '@nestjs/common';
import { BoardResolver } from './board.resolver';
import { BoardService } from './board.service';
import { PrismaModuleTest } from 'src/prisma.module';
import { ColumnService } from '../column/column.service';

@Module({
   imports: [PrismaModuleTest],
   providers: [BoardResolver, BoardService, ColumnService],
})
export class BoardModule {}
