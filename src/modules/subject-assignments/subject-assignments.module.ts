import { Module } from '@nestjs/common';

import { SubjectAssignmentsController } from './controllers/subject-assignments.controller';
import { SubjectAssignmentsService } from './services/subject-assignments.service';

@Module({
  controllers: [
    SubjectAssignmentsController,
  ],
  providers: [
    SubjectAssignmentsService,
  ],
})
export class SubjectAssignmentsModule {}