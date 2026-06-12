import {
  IsBoolean,
} from 'class-validator';

export class TogglePremiumDto {
  @IsBoolean()
  isPremium: boolean;
}