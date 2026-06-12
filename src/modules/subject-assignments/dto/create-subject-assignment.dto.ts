import {
  ArrayNotEmpty,
  IsArray,
  IsString,
} from 'class-validator';

export class CreateSubjectAssignmentDto {
  @IsString()
  subjectId: string;

  @IsArray()
  @ArrayNotEmpty()
  academicLevelIds: string[];
}