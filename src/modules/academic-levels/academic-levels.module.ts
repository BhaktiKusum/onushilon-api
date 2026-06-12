import { Module } from '@nestjs/common';

import { AcademicLevelsController } from './controllers/academic-levels.controller';
import { AcademicLevelsService } from './services/academic-levels.service';

@Module({
  controllers: [AcademicLevelsController],
  providers: [AcademicLevelsService],
})
export class AcademicLevelsModule {}