import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeederService } from './seeder.service';
import { typeOrmConfig } from '../config/typeorm.config';
import { GenreModule } from '../genre/genre.module';
import { LanguageModule } from '../language/language.module';
import { FormatModule } from '../format/format.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    GenreModule,
    LanguageModule,
    FormatModule,
  ],
  providers: [SeederService],
})
export class SeederModule {}
