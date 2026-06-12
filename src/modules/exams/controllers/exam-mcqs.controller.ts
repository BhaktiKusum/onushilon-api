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

import { AssignMcqsDto } from '../dto/assign-mcqs.dto';

import { ExamMcqsService } from '../services/exam-mcqs.service';
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
export class ExamMcqsController {
  constructor(
    private readonly examMcqsService: ExamMcqsService,
  ) {}

  @Post(':examId/mcqs')
  assign(
    @Param('examId')
    examId: string,

    @Body()
    dto: AssignMcqsDto,
  ) {
    return this.examMcqsService.assign(
      examId,
      dto.mcqIds,
    );
  }

  @Get(':examId/mcqs')
  findAll(
    @Param('examId')
    examId: string,
  ) {
    return this.examMcqsService.findAll(
      examId,
    );
  }

  @Delete(
    ':examId/mcqs/:mcqId',
  )
  remove(
    @Param('examId')
    examId: string,

    @Param('mcqId')
    mcqId: string,
  ) {
    return this.examMcqsService.remove(
      examId,
      mcqId,
    );
  }
}