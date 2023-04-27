import { Module } from '@nestjs/common';
import { SubtaskResolver } from './subtask.resolver';
import { SubtaskService } from './subtask.service';
import { PrismaModuleTest } from 'src/prisma.module';

@Module({
   imports: [PrismaModuleTest],
   providers: [SubtaskResolver, SubtaskService],
})
export class SubtaskModule {}
