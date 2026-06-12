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

import { SubjectAssignmentsService } from '../services/subject-assignments.service';

import { CreateSubjectAssignmentDto } from '../dto/create-subject-assignment.dto';

import { ApiBearerAuth } from '@nestjs/swagger';



@ApiBearerAuth('access-token')

@Controller('subject-assignments')
@UseGuards(
  JwtAuthGuard,
  RolesGuard,
)
export class SubjectAssignmentsController {
  constructor(
    private readonly service: SubjectAssignmentsService,
  ) {}

  @Post()
  @Roles(
    UserRole.ADMIN,
    UserRole.SUBADMIN,
  )
  create(
    @Body()
    dto: CreateSubjectAssignmentDto,
  ) {
    return this.service.create(dto);
  }

  @Get()
  @Roles(
    UserRole.ADMIN,
    UserRole.SUBADMIN,
    UserRole.STUDENT,
  )
  findAll() {
    return this.service.findAll();
  }

  @Get(
    'academic-level/:academicLevelId',
  )
  @Roles(
    UserRole.ADMIN,
    UserRole.SUBADMIN,
    UserRole.STUDENT,
  )
  getAcademicLevelSubjects(
    @Param('academicLevelId')
    academicLevelId: string,
  ) {
    return this.service.getAcademicLevelSubjects(
      academicLevelId,
    );
  }

  @Delete(':id')
  @Roles(
    UserRole.ADMIN,
    UserRole.SUBADMIN,
  )
  remove(
    @Param('id') id: string,
  ) {
    return this.service.remove(id);
  }
}