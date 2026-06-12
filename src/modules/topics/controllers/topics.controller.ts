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

import { TopicsService } from '../services/topics.service';

import { CreateTopicDto } from '../dto/create-topic.dto';
import { UpdateTopicDto } from '../dto/update-topic.dto';

import { ApiBearerAuth } from '@nestjs/swagger';



@ApiBearerAuth('access-token')

@Controller('topics')
@UseGuards(
  JwtAuthGuard,
  RolesGuard,
)
export class TopicsController {
  constructor(
    private readonly topicsService: TopicsService,
  ) {}

  /**
   * Create Topic
   */
  @Post()
  @Roles(
    UserRole.ADMIN,
    UserRole.SUBADMIN,
  )
  create(
    @Body()
    dto: CreateTopicDto,
  ) {
    return this.topicsService.create(
      dto,
    );
  }

  /**
   * Get Topics
   */
  @Get()
  @Roles(
    UserRole.ADMIN,
    UserRole.SUBADMIN,
    UserRole.STUDENT,
  )
  findAll(
    @Query('chapterId')
    chapterId?: string,
  ) {
    return this.topicsService.findAll(
      chapterId,
    );
  }

  /**
   * Get Topic Details
   */
  @Get(':id')
  @Roles(
    UserRole.ADMIN,
    UserRole.SUBADMIN,
  )
  findOne(
    @Param('id')
    id: string,
  ) {
    return this.topicsService.findOne(id);
  }

  /**
   * Update Topic
   */
  @Patch(':id')
  @Roles(
    UserRole.ADMIN,
    UserRole.SUBADMIN,
  )
  update(
    @Param('id')
    id: string,

    @Body()
    dto: UpdateTopicDto,
  ) {
    return this.topicsService.update(
      id,
      dto,
    );
  }

  /**
   * Delete Topic
   */
  @Delete(':id')
  @Roles(
    UserRole.ADMIN,
    UserRole.SUBADMIN,
  )
  remove(
    @Param('id')
    id: string,
  ) {
    return this.topicsService.remove(id);
  }
}