import {
  ArrayMinSize,
  IsArray,
  IsString,
} from 'class-validator';

export class AssignChaptersDto {
  @IsArray()
  @ArrayMinSize(1)
  @IsString({
    each: true,
  })
  chapterIds: string[];
}