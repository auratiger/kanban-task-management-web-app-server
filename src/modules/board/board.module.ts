import { Module } from '@nestjs/common';
import { BoardResolver } from './board.resolver';
import { BoardService } from './board.service';
import { PrismaModuleTest } from 'src/prisma.module';

@Module({
   imports: [PrismaModuleTest],
   providers: [BoardResolver, BoardService],
})
export class BoardModule {}
