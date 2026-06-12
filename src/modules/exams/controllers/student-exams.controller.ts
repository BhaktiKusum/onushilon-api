import {
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

import { UserRole } from '../../../common/enums/user-role.enum';

import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { Roles } from '../../../common/decorators/roles.decorator';

import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';

import { ExamsService } from '../services/exams.service';
import { ApiBearerAuth } from '@nestjs/swagger';



@ApiBearerAuth('access-token')

@Controller('student/exams')
@UseGuards(
  JwtAuthGuard,
  RolesGuard,
)
@Roles(UserRole.STUDENT)
export class StudentExamsController {
  constructor(
    private readonly examsService: ExamsService,
  ) {}

  /**
   * Available Exams
   */
  @Get()
  findAvailableExams() {
    return this.examsService.findPublishedExams();
  }

  /**
   * Exam Details
   */
  @Get(':id')
  findExamDetails(
    @Param('id')
    id: string,
  ) {
    return this.examsService.findPublishedExam(
      id,
    );
  }

  /**
   * Enroll Exam
   */
  @Post(':examId/enroll')
  enroll(
    @Param('examId')
    examId: string,

    @CurrentUser()
    user: any,
  ) {
    return this.examsService.enroll(
      examId,
      user.id,
    );
  }

  /**
   * My Enrollments
   */
  @Get('enrollments/me')
  myEnrollments(
    @CurrentUser()
    user: any,
  ) {
    return this.examsService.myEnrollments(
      user.id,
    );
  }
}