import {
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateSubjectDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  adminDisplayName?: string;

  @IsOptional()
  isActive?: boolean;
}