import { Module } from '@nestjs/common';

import { ExamsController } from './controllers/exams.controller';
import { StudentExamsController } from './controllers/student-exams.controller';
import { ExamMcqsController } from './controllers/exam-mcqs.controller';

import { ExamsService } from './services/exams.service';
import { ExamMcqsService } from './services/exam-mcqs.service';

import { ExamSubjectsController } from './controllers/exam-subjects.controller';

import { ExamSubjectsService } from './services/exam-subjects.service';

import { ExamChaptersController } from './controllers/exam-chapters.controller';

import { ExamChaptersService } from './services/exam-chapters.service';

@Module({
  controllers: [
    ExamsController,
    StudentExamsController,
    ExamMcqsController,
    ExamSubjectsController,
    ExamChaptersController,
  ],

  providers: [
    ExamsService,
    ExamMcqsService, // ← REQUIRED
    ExamSubjectsService, // ← REQUIRED
    ExamChaptersService, // ← REQUIRED
  ],

  exports: [
    ExamsService,
    ExamMcqsService,
    ExamSubjectsService,
    ExamChaptersService,
  ],
})
export class ExamsModule {}