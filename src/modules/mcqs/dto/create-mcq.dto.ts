import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

import {
  DifficultyLevel,
  MCQType,
} from '@prisma/client';

export class CreateMcqDto {

  @IsEnum(MCQType)
  type: MCQType;

  @IsOptional()
  @IsObject()
  scenario?: Record<string, any>;

  @IsObject()
  question: Record<string, any>;

  @IsArray()
  options: Record<string, any>[];

  @IsString()
  correctOptionKey: string;

  @IsOptional()
  @IsObject()
  explanation?: Record<string, any>;

  @IsOptional()
  @IsArray()
  references?: Record<string, any>[];

  @IsEnum(DifficultyLevel)
  difficulty: DifficultyLevel;

  @IsOptional()
  @IsBoolean()
  isPremium?: boolean;
}