import { Module } from '@nestjs/common';
import { ColumnResolver } from './column.resolver';
import { ColumnService } from './column.service';

@Module({
   imports: [],
   providers: [ColumnResolver, ColumnService],
})
export class ColumnModule {}
