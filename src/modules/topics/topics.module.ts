import { Module } from '@nestjs/common';

import { TopicsController } from './controllers/topics.controller';
import { TopicsService } from './services/topics.service';

@Module({
  controllers: [TopicsController],
  providers: [TopicsService],
  exports: [TopicsService],
})
export class TopicsModule {}