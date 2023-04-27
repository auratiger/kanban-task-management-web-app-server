import { Module } from '@nestjs/common';
import { TaskResolver } from './task.resolver';
import { TaskService } from './task.service';
import { PrismaModuleTest } from 'src/prisma.module';

@Module({
   imports: [PrismaModuleTest],
   providers: [TaskResolver, TaskService],
})
export class TaskModule {}
