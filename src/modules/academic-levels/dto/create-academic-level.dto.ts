import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateAcademicLevelDto {
  @IsString()
  @IsNotEmpty()
  name: string;

}