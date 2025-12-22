import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeederService } from './seeder.service';
import { typeOrmConfig } from '@src/config/typeorm.config';
import { MovieModule } from '@src/movie/movie.module';
import { SeatModule } from '@src/seat/seat.module';
import { ScreenModule } from '@src/screen/screen.module';
import { ShowModule } from '@src/show/show.module';
import { VenueModule } from '@src/venue/venue.module';
import { GenreModule } from '@src/genre/genre.module';
import { CertificateModule } from '@src/certificates/certificate.module';
import { WorkerModule } from '@src/worker/worker.module';
import { LanguageModule } from '@src/language/language.module';
import { FormatModule } from '@src/format/format.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    MovieModule,
    SeatModule,
    ScreenModule,
    ShowModule,
    VenueModule,
    GenreModule,
    CertificateModule,
    WorkerModule,
    LanguageModule,
    FormatModule,
  ],
  providers: [SeederService],
})
export class SeederModule {}
