// src/config/typeorm.config.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Genre } from '../genre/genre.entity';
import { Language } from '../language/language.entity';
import { Format } from '../format/format.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'postgres',
  entities: [User, Genre, Language, Format],
  synchronize: true,
};
