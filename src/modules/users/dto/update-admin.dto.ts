import {
  IsEnum,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

import { UserRole } from '@prisma/client';

export class UpdateAdminDto {
  @IsOptional()
  @IsString()
  @Matches(/^01[3-9]\d{8}$/)
  phone?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @IsOptional()
  isActive?: boolean;
}