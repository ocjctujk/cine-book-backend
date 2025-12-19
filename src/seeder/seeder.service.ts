// src/seeder/seeder.service.ts
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from '@src/movie/movie.entity';
import { Seat } from '@src/seat/seat.entity';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepo: Repository<Movie>,
    @InjectRepository(Seat)
    private readonly seatRepo: Repository<Seat>,
  ) {}

  async seed() {
    console.log('🌱 Starting database seeding...');

    const existingMovies = await this.movieRepo.find();
    if (existingMovies.length === 0) {
      const movie = new Movie();
      movie.name = 'Dhurandhar';
      movie.description = 'Its a good movie starring Ranbern Singh';
      movie.release_date = new Date();
      movie.poster_url = '';
      movie.duration = 138;

      await this.movieRepo.save(movie);
    }

    const existingSeats = await this.seatRepo.find();
    if (existingSeats.length === 0) {
      await this.seatRepo.save([
        {
          name: 'M-1',
        },
        {
          name: 'M-2',
        },
        {
          name: 'M-3',
        },
      ]);
    }
    console.log('✅ Seeding complete!');
  }
}
