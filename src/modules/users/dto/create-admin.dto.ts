import {
  IsEnum,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

import { UserRole } from '../../../common/enums/user-role.enum';

export class CreateAdminDto {
  @IsString()
  @Matches(/^01[3-9]\d{8}$/)
  phone: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsEnum(UserRole)
  role: UserRole;
}