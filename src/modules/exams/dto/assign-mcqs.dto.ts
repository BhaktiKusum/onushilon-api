import {
  ArrayMinSize,
  IsArray,
  IsOptional,
  IsString,
} from 'class-validator';

export class AssignMcqsDto {
  @IsArray()
  @ArrayMinSize(1)
  mcqIds: string[];

  @IsOptional()
  orderNo?: number;
}