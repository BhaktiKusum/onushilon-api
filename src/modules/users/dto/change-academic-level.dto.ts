import { IsString, MaxLength } from 'class-validator';

export class ChangeAcademicLevelDto {
  @IsString()
  academicLevelId: string;
}