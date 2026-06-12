import {
  ArrayMinSize,
  IsArray,
  IsString,
} from 'class-validator';

export class AssignSubjectsDto {
  @IsArray()
  @ArrayMinSize(1)
  @IsString({
    each: true,
  })
  subjectIds: string[];
}