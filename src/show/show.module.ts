import { Module } from '@nestjs/common';
import { ShowController } from './show.controller';
import { ShowService } from './show.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Show } from './show.entity';
import { Booking } from '@src/booking/booking.entity';
import { Movie } from '@src/movie/movie.entity';
import { Venue } from '@src/venue/venue.entity';
import { Language } from '@src/language/language.entity';
import { Format } from '@src/format/format.entity';
import { Screen } from '@src/screen/screen.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Show,
      Booking,
      Movie,
      Venue,
      Screen,
      Language,
      Format,
    ]),
  ],
  controllers: [ShowController],
  providers: [ShowService],
  exports: [TypeOrmModule],
})
export class ShowModule {}
