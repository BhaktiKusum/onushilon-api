import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';

import { UserRole } from '../../../common/enums/user-role.enum';

import { Roles } from '../../../common/decorators/roles.decorator';

import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';

import { UploadsService } from '../services/uploads.service';

@Controller('uploads')
@UseGuards(
  JwtAuthGuard,
  RolesGuard,
)
export class UploadsController {
  constructor(
    private readonly uploadsService: UploadsService,
  ) {}

  @Post('image')
  @Roles(
    UserRole.ADMIN,
    UserRole.SUBADMIN,
  )
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize:
          5 * 1024 * 1024,
      },
    }),
  )
  uploadImage(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    const allowedMimeTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
    ];

    if (
      !allowedMimeTypes.includes(
        file.mimetype,
      )
    ) {
      throw new BadRequestException(
        'Invalid image type',
      );
    }

    return this.uploadsService.uploadImage(
      file,
    );
  }
}