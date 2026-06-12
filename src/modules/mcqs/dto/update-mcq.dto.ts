import {
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
} from "class-validator";

import {
  DifficultyLevel,
  MCQType,
} from "@prisma/client";

export class UpdateMcqDto {
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
  scenario?: Record<string, any>;

  @IsOptional()
  question?: Record<string, any>;

  @IsOptional()
  options?: Record<string, any>[];

  @IsOptional()
  @IsString()
  correctOptionKey?: string;

  @IsOptional()
  explanation?: Record<string, any>;

  @IsOptional()
  references?: Record<string, any>[];

  @IsOptional()
  @IsEnum(DifficultyLevel)
  difficulty?: DifficultyLevel;

  @IsOptional()
  @IsBoolean()
  isPremium?: boolean;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}