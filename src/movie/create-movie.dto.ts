import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsDate,
  IsUrl,
  IsInt,
  IsArray,
} from 'class-validator';

// filepath: /home/maharshi-gohel/Desktop/Cine-book/server/src/movie/create-movie.dto.ts

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @Type(() => Date)
  @IsDate()
  release_date: Date;

  @IsUrl()
  @IsNotEmpty()
  poster_url: string;

  @IsInt()
  @IsNotEmpty()
  duration: number;

  @IsInt()
  @IsNotEmpty()
  certificateId: number;

  @IsArray()
  @IsInt({ each: true })
  genreIds: number[];

  @IsArray()
  @IsInt({ each: true })
  workerIds: number[];

  @IsArray()
  @IsInt({ each: true })
  languageIds: number[];

  @IsArray()
  @IsInt({ each: true })
  formatIds: number[];
}
