// src/config/typeorm.config.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '@src/users/user.entity';
import { Genre } from '@src/genre/genre.entity';
import { Language } from '@src/language/language.entity';
import { Format } from '@src/format/format.entity';
import { Certificate } from '@src/certificates/certificate.entity';
import { People } from '@src/people/people.entity';
import { Offer } from '@src/offers/offers.entity';
import { Movie } from '@src/movie/movie.entity';
import { Seat } from '@src/seat/seat.entity';
import { SeatClass } from '@src/seatClass/seat-class.entity';
import { Screen } from '@src/screen/screen.entity';
import { Venue } from '@src/venue/venue.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'postgres',
  entities: [
    User,
    Genre,
    Language,
    Format,
    Certificate,
    People,
    Offer,
    Movie,
    Seat,
    SeatClass,
    Screen,
    Venue,
  ],
  synchronize: true,
};
