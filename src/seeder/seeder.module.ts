import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeederService } from './seeder.service';
import { typeOrmConfig } from '@src/config/typeorm.config';
import { MovieModule } from '@src/movie/movie.module';
import { SeatModule } from '@src/seat/seat.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), MovieModule, SeatModule],
  providers: [SeederService],
})
export class SeederModule {}
