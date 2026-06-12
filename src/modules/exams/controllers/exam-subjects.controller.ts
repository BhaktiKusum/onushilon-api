import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

import { UserRole } from '../../../common/enums/user-role.enum';

import { Roles } from '../../../common/decorators/roles.decorator';

import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';

import { AssignSubjectsDto } from '../dto/assign-subjects.dto';

import { ExamSubjectsService } from '../services/exam-subjects.service';

import { ApiBearerAuth } from '@nestjs/swagger';



@ApiBearerAuth('access-token')

@Controller('exams')
@UseGuards(
  JwtAuthGuard,
  RolesGuard,
)
@Roles(
  UserRole.ADMIN,
  UserRole.SUBADMIN,
)
export class ExamSubjectsController {
  constructor(
    private readonly examSubjectsService: ExamSubjectsService,
  ) {}

  @Post(':examId/subjects')
  assign(
    @Param('examId')
    examId: string,

    @Body()
    dto: AssignSubjectsDto,
  ) {
    return this.examSubjectsService.assign(
      examId,
      dto.subjectIds,
    );
  }

  @Get(':examId/subjects')
  findAll(
    @Param('examId')
    examId: string,
  ) {
    return this.examSubjectsService.findAll(
      examId,
    );
  }

  @Delete(
    ':examId/subjects/:subjectId',
  )
  remove(
    @Param('examId')
    examId: string,

    @Param('subjectId')
    subjectId: string,
  ) {
    return this.examSubjectsService.remove(
      examId,
      subjectId,
    );
  }
}