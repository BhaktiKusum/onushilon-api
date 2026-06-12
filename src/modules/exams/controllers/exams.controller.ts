import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { UserRole } from '../../../common/enums/user-role.enum';

import { Roles } from '../../../common/decorators/roles.decorator';

import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';

import { CreateExamDto } from '../dto/create-exam.dto';
import { UpdateExamDto } from '../dto/update-exam.dto';

import { ExamsService } from '../services/exams.service';

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
export class ExamsController {
  constructor(
    private readonly examsService: ExamsService,
  ) {}

  /**
   * Create Exam
   */
  @Post()
  create(
    @Body()
    dto: CreateExamDto,
  ) {
    return this.examsService.create(dto);
  }

  /**
   * Get All Exams
   */
  @Get()
  findAll() {
    return this.examsService.findAll();
  }

  /**
   * Get Single Exam
   */
  @Get(':id')
  findOne(
    @Param('id')
    id: string,
  ) {
    return this.examsService.findOne(id);
  }

  /**
   * Update Exam
   */
  @Patch(':id')
  update(
    @Param('id')
    id: string,

    @Body()
    dto: UpdateExamDto,
  ) {
    return this.examsService.update(
      id,
      dto,
    );
  }

  /**
   * Publish Exam
   */
  @Patch(':id/publish')
  publish(
    @Param('id')
    id: string,
  ) {
    return this.examsService.publish(id);
  }

  /**
   * Soft Delete Exam
   */
  @Delete(':id')
  remove(
    @Param('id')
    id: string,
  ) {
    return this.examsService.remove(id);
  }
}