import { Module } from '@nestjs/common';

import { SubjectsController } from './controllers/subjects.controller';
import { SubjectsService } from './services/subjects.service';

@Module({
  controllers: [SubjectsController],
  providers: [SubjectsService],
})
export class SubjectsModule {}