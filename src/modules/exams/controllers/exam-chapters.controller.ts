import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

import { Roles } from '../../../common/decorators/roles.decorator';

import { UserRole } from '../../../common/enums/user-role.enum';

import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';

import { AssignChaptersDto } from '../dto/assign-chapters.dto';

import { ExamChaptersService } from '../services/exam-chapters.service';
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
export class ExamChaptersController {
  constructor(
    private readonly examChaptersService: ExamChaptersService,
  ) {}

  /**
   * Assign Chapters
   */
  @Post(':examId/chapters')
  assign(
    @Param('examId')
    examId: string,

    @Body()
    dto: AssignChaptersDto,
  ) {
    return this.examChaptersService.assign(
      examId,
      dto.chapterIds,
    );
  }

  /**
   * Get Chapters
   */
  @Get(':examId/chapters')
  findAll(
    @Param('examId')
    examId: string,
  ) {
    return this.examChaptersService.findAll(
      examId,
    );
  }

  /**
   * Remove Chapter
   */
  @Delete(
    ':examId/chapters/:chapterId',
  )
  remove(
    @Param('examId')
    examId: string,

    @Param('chapterId')
    chapterId: string,
  ) {
    return this.examChaptersService.remove(
      examId,
      chapterId,
    );
  }
}