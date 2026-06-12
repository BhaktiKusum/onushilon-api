import {
  IsNotEmpty,
  IsString,
  IsUUID,
  Matches,
  MinLength,
} from 'class-validator';

export class StudentSignupDto {
  @IsString()
  @Matches(/^01[3-9]\d{8}$/)
  phone: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @IsNotEmpty()
  academicLevelId: string;
}