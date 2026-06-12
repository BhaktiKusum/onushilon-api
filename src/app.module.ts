import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { AcademicLevelsModule } from './modules/academic-levels/academic-levels.module';
import { SubjectsModule } from './modules/subjects/subjects.module';
import { SubjectAssignmentsModule } from './modules/subject-assignments/subject-assignments.module';
import { ChaptersModule } from './modules/chapters/chapters.module';
import { TopicsModule } from './modules/topics/topics.module';
import { McqsModule } from './modules/mcqs/mcqs.module';
import { UploadsModule } from './modules/uploads/uploads.module';

import { PrismaModule } from './prisma/prisma.module';
import { ExamsModule } from './modules/exams/exams.module';

@Module({
  imports: [
    AuthModule,

    UsersModule,

    AcademicLevelsModule,

    SubjectsModule,
    SubjectAssignmentsModule,

    ChaptersModule,
    TopicsModule,

    UploadsModule,

    McqsModule,
    PrismaModule,
    ExamsModule,
  ],
})
export class AppModule {}

