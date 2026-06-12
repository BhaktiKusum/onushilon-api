import {
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateAcademicLevelDto {
  @IsOptional()
@IsString()
  name: string;

}