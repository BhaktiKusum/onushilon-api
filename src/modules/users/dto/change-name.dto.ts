import { IsString, MaxLength } from 'class-validator';

export class ChangeNameDto {
  @IsString()
  @MaxLength(100)
  name: string;
}