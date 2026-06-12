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

import { SubjectsService } from '../services/subjects.service';

import { CreateSubjectDto } from '../dto/create-subject.dto';
import { UpdateSubjectDto } from '../dto/update-subject.dto';

import { ApiBearerAuth } from '@nestjs/swagger';



@ApiBearerAuth('access-token')

@Controller('subjects')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SubjectsController {
  constructor(
    private readonly subjectsService: SubjectsService,
  ) {}

  @Post()
  @Roles(
    UserRole.ADMIN,
    UserRole.SUBADMIN,
  )
  create(
    @Body() dto: CreateSubjectDto,
  ) {
    return this.subjectsService.create(dto);
  }

  @Get()
  @Roles(
    UserRole.ADMIN,
    UserRole.SUBADMIN,
  )
  findAll() {
    return this.subjectsService.findAll();
  }

  @Get(':id')
  @Roles(
    UserRole.ADMIN,
    UserRole.SUBADMIN,
  )
  findOne(
    @Param('id') id: string,
  ) {
    return this.subjectsService.findOne(id);
  }

  @Patch(':id')
  @Roles(
    UserRole.ADMIN,
    UserRole.SUBADMIN,
  )
  update(
    @Param('id') id: string,
    @Body() dto: UpdateSubjectDto,
  ) {
    return this.subjectsService.update(
      id,
      dto,
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
    return this.subjectsService.delete(id);
  }
}