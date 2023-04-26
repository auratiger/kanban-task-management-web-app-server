import { Module } from '@nestjs/common';
import { SubtaskResolver } from './subtask.resolver';
import { SubtaskService } from './subtask.service';

@Module({
   imports: [],
   providers: [SubtaskResolver, SubtaskService],
})
export class SubtaskModule {}
