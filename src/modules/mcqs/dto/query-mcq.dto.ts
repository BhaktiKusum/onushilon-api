import {
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';

import {
  DifficultyLevel,
  MCQType,
} from '@prisma/client';

export class QueryMcqDto {
  @IsOptional()
  @IsString()
  subjectId?: string;

  @IsOptional()
  @IsString()
  chapterId?: string;

  @IsOptional()
  @IsString()
  topicId?: string;

  @IsOptional()
  @IsEnum(MCQType)
  type?: MCQType;

  @IsOptional()
  @IsEnum(DifficultyLevel)
  difficulty?: DifficultyLevel;

  @IsOptional()
  search?: string;
}