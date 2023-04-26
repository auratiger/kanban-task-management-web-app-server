import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { PrismaHealthIndicator } from './indicators/prisma.indicator';

@Module({
   imports: [TerminusModule, HttpModule],
   controllers: [HealthController],
   providers: [PrismaHealthIndicator],
})
export class HealthModule {}
