import { IsNumber, IsString } from 'class-validator';

export class CreateShowDto {
  @IsString()
  time: string;

  @IsNumber()
  cost: number;
  @IsNumber()
  movieId: number;
  @IsNumber()
  venueId: number;
  @IsNumber()
  screenId: number;
  @IsNumber()
  languageId: number;
  @IsNumber()
  formatId: number;
}
