import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeederService } from './seeder.service';
import { typeOrmConfig } from '@src/config/typeorm.config';
import { GenreModule } from '@src/genre/genre.module';
import { LanguageModule } from '@src/language/language.module';
import { FormatModule } from '@src/format/format.module';
import { CertificateModule } from '@src/certificates/certificate.module';
import { MovieModule } from '@src/movie/movie.module';
import { SeatModule } from '@src/seat/seat.module';
import { SeatClassModule } from '@src/seatClass/seat-class.module';
import { ScreenModule } from '@src/screen/screen.module';
import { VenueModule } from '@src/venue/venue.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    GenreModule,
    LanguageModule,
    FormatModule,
    CertificateModule,
    MovieModule,
    SeatModule,
    SeatClassModule,
    ScreenModule,
    VenueModule,
  ],
  providers: [SeederService],
})
export class SeederModule {}
