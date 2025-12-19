import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeederService } from './seeder.service';
import { typeOrmConfig } from '@src/config/typeorm.config';
import { MovieModule } from '@src/movie/movie.module';
import { SeatModule } from '@src/seat/seat.module';
import { ScreenModule } from '@src/screen/screen.module';
import { ShowModule } from '@src/show/show.module';
import { VenueModule } from '@src/venue/venue.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    MovieModule,
    SeatModule,
    ScreenModule,
    ShowModule,
    VenueModule,
  ],
  providers: [SeederService],
})
export class SeederModule {}
