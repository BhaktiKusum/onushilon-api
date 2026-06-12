import {
  IsArray,
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

import {
  EnrollmentType,
  ExamType,
} from '@prisma/client';

export class CreateExamDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(ExamType)
  type: ExamType;

  @IsEnum(EnrollmentType)
  enrollmentType: EnrollmentType;

  @IsString()
  academicLevelId: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  subjectIds?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  chapterIds?: string[];

  @IsOptional()
  @IsInt()
  orderNo?: number;

  @IsInt()
  @Min(1)
  durationMinutes: number;

  @IsInt()
  @Min(1)
  totalMarks: number;

  @IsOptional()
  negativeMarks?: number;

  @IsOptional()
  @IsDateString()
  startAt?: string;

  @IsOptional()
  @IsDateString()
  endAt?: string;

  @IsOptional()
  @IsInt()
  maxParticipants?: number;
}