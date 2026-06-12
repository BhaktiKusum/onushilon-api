import { IsString, Matches, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @Matches(/^01[3-9]\d{8}$/)
  phone: string;

  @IsString()
  @MinLength(6)
  password: string;
}