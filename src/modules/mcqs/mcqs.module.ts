import { Module } from '@nestjs/common';

import { McqsController } from './controllers/mcqs.controller';
import { McqImportController } from './controllers/mcq-import.controller';

import { McqsService } from './services/mcqs.service';
import { McqImportService } from './services/mcq-import.service';

@Module({
  controllers: [
    McqsController,
    McqImportController,
  ],

  providers: [
    McqsService,
    McqImportService,
  ],

  exports: [
    McqsService,
  ],
})
export class McqsModule {}