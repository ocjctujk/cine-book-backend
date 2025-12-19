// src/config/typeorm.config.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '@src/users/user.entity';
import { Movie } from '@src/movie/movie.entity';
import { Seat } from '@src/seat/seat.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'postgres',
  entities: [User, Movie, Seat],
  synchronize: true,
};
