import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { UserRole } from '../../../common/enums/user-role.enum';

import { Roles } from '../../../common/decorators/roles.decorator';

import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';

import { ChaptersService } from '../services/chapters.service';

import { CreateChapterDto } from '../dto/create-chapter.dto';
import { UpdateChapterDto } from '../dto/update-chapter.dto';

import { ApiBearerAuth } from '@nestjs/swagger';



@ApiBearerAuth('access-token')

@Controller('chapters')
@UseGuards(
  JwtAuthGuard,
  RolesGuard,
)
export class ChaptersController {
  constructor(
    private readonly service: ChaptersService,
  ) {}

  @Post()
  @Roles(
    UserRole.ADMIN,
    UserRole.SUBADMIN,
  )
  create(
    @Body() dto: CreateChapterDto,
  ) {
    return this.service.create(dto);
  }

  @Get()
  @Roles(
    UserRole.ADMIN,
    UserRole.SUBADMIN,
    UserRole.STUDENT,
  )
  findAll(
    @Query('subjectId')
    subjectId?: string,
  ) {
    return this.service.findAll(
      subjectId,
    );
  }

  @Get(':id')
  @Roles(
    UserRole.ADMIN,
    UserRole.SUBADMIN,
  )
  findOne(
    @Param('id') id: string,
  ) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @Roles(
    UserRole.ADMIN,
    UserRole.SUBADMIN,
  )
  update(
    @Param('id') id: string,
    @Body() dto: UpdateChapterDto,
  ) {

    return this.service.update(
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
    return this.service.delete(id);
  }
}