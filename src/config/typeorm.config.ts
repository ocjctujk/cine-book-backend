// src/config/typeorm.config.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '@src/users/user.entity';
import { Movie } from '@src/movie/movie.entity';
import { Seat } from '@src/seat/seat.entity';
import { Show } from '@src/show/show.entity';
import { Venue } from '@src/venue/venue.entity';
import { Screen } from '@src/screen/screen.entity';
import { Booking } from '@src/booking/booking.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'postgres',
  entities: [User, Movie, Seat, Show, Venue, Screen, Booking],
  synchronize: true,
};
