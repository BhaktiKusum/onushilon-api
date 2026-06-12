import {
  Controller,
  Get,
  Param,
  UseGuards,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';

import { AcademicLevelsService } from '../services/academic-levels.service';

import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { CreateAcademicLevelDto } from '../dto/create-academic-level.dto';
import { UserRole } from 'src/common/enums/user-role.enum';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UpdateAcademicLevelDto } from '../dto/update-academic-level.dto';

import { ApiBearerAuth } from '@nestjs/swagger';



@ApiBearerAuth('access-token')

@Controller('academic-levels')
@UseGuards(JwtAuthGuard)
export class AcademicLevelsController {
  constructor(
    private readonly academicLevelsService: AcademicLevelsService,
  ) {}

  @Post()
    @Roles(
      UserRole.ADMIN,
      UserRole.SUBADMIN,
    )
    create(
      @Body() dto: CreateAcademicLevelDto,
    ) {
      return this.academicLevelsService.create(dto);
    }

  /**
   * Get all academic levels
   */
  @Get()
  async findAll() {
    return this.academicLevelsService.findAll();
  }

  /**
   * Get single academic level
   */
  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ) {
    return this.academicLevelsService.findOne(id);
  }


    @Patch(':id')
    @Roles(
      UserRole.ADMIN,
      UserRole.SUBADMIN,
    )
    update(
      @Param('id') id: string,
      @Body() dto: UpdateAcademicLevelDto,
    ) {
      return this.academicLevelsService.update(
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
        return this.academicLevelsService.delete(id);
      }
}