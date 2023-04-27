import { Module } from '@nestjs/common';
import { PrismaSelectService } from './prisma-select.service';

@Module({
   providers: [PrismaSelectService],
   exports: [PrismaSelectService],
})
export class PrismaModuleTest {}
