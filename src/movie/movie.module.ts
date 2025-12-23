import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './movie.entity';
import { Certificate } from '@src/certificates/certificate.entity';
import { Genre } from '@src/genre/genre.entity';
import { Worker } from '@src/worker/worker.entity';
import { Language } from '@src/language/language.entity';
import { Format } from '@src/format/format.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Movie,
      Certificate,
      Genre,
      Worker,
      Language,
      Format,
    ]),
  ],
  controllers: [MovieController],
  providers: [MovieService],
  exports: [TypeOrmModule],
})
export class MovieModule {}
