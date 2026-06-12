import {
  Controller,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';

import { UserRole } from '../../../common/enums/user-role.enum';

import { Roles } from '../../../common/decorators/roles.decorator';

import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';

import { McqImportService } from '../services/mcq-import.service';

import { ApiBearerAuth } from '@nestjs/swagger';



@ApiBearerAuth('access-token')

@Controller('mcqs/import')
@UseGuards(
  JwtAuthGuard,
  RolesGuard,
)
@Roles(
  UserRole.ADMIN,
  UserRole.SUBADMIN,
)
export class McqImportController {
  constructor(
  private readonly mcqImportService: McqImportService,
) {}

  /**
   * Preview Excel
   */
@Post()
@UseInterceptors(
  FileInterceptor('file'),
)
import(
  @Query('subjectId')
  subjectId: string,

  @Query('chapterId')
  chapterId: string,

  @Query('topicId')
  topicId: string,

  @UploadedFile()
  file: Express.Multer.File,
) {
  return this.mcqImportService.import(
    {
      subjectId,
      chapterId,
      topicId,
    },
    file,
  );
}

}