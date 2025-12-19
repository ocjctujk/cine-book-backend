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
      const movies: Partial<Movie>[] = [
        {
          name: 'Dhurandhar',
          description: 'A gripping action drama starring Ranbern Singh.',
          release_date: new Date('2024-02-01'),
          duration: 138,
          poster_url: 'https://dummyimage.com/300x450/000/fff&text=Dhurandhar',
        },
        {
          name: 'The Lost City',
          description: 'A thrilling adventure through forgotten ruins.',
          release_date: new Date('2023-05-10'),
          duration: 120,
          poster_url:
            'https://dummyimage.com/300x450/222/fff&text=The+Lost+City',
        },
        {
          name: 'Moonfall',
          description: 'A sci-fi journey to save Earth from a lunar disaster.',
          release_date: new Date('2022-08-15'),
          duration: 130,
          poster_url: 'https://dummyimage.com/300x450/444/fff&text=Moonfall',
        },
        {
          name: 'Eternal Summer',
          description:
            'A heartfelt coming-of-age story about friendship and love.',
          release_date: new Date('2021-06-12'),
          duration: 110,
          poster_url:
            'https://dummyimage.com/300x450/555/fff&text=Eternal+Summer',
        },
        {
          name: 'Midnight Heist',
          description: 'A fast-paced crime thriller set in New York.',
          release_date: new Date('2024-10-21'),
          duration: 125,
          poster_url:
            'https://dummyimage.com/300x450/333/fff&text=Midnight+Heist',
        },
        {
          name: 'Crimson Shadow',
          description: 'A mysterious assassin seeks redemption.',
          release_date: new Date('2023-11-03'),
          duration: 140,
          poster_url:
            'https://dummyimage.com/300x450/880000/fff&text=Crimson+Shadow',
        },
        {
          name: 'Neon Dreams',
          description: 'A cyberpunk thriller about identity and technology.',
          release_date: new Date('2025-01-15'),
          duration: 118,
          poster_url:
            'https://dummyimage.com/300x450/0066ff/fff&text=Neon+Dreams',
        },
        {
          name: 'Frozen Path',
          description: 'A survival tale set in the icy wilderness.',
          release_date: new Date('2022-12-19'),
          duration: 112,
          poster_url:
            'https://dummyimage.com/300x450/00cccc/fff&text=Frozen+Path',
        },
        {
          name: 'Hidden Truths',
          description: 'A legal drama that uncovers deep secrets.',
          release_date: new Date('2023-03-02'),
          duration: 127,
          poster_url:
            'https://dummyimage.com/300x450/660066/fff&text=Hidden+Truths',
        },
        {
          name: 'Afterlight',
          description: 'A time-bending sci-fi mystery.',
          release_date: new Date('2024-07-09'),
          duration: 135,
          poster_url:
            'https://dummyimage.com/300x450/000099/fff&text=Afterlight',
        },
        {
          name: 'Golden Horizon',
          description: 'A historical epic about courage and destiny.',
          release_date: new Date('2023-09-17'),
          duration: 142,
          poster_url:
            'https://dummyimage.com/300x450/996600/fff&text=Golden+Horizon',
        },
        {
          name: 'Echoes of Tomorrow',
          description: 'A moving sci-fi drama about love and memory.',
          release_date: new Date('2025-05-27'),
          duration: 129,
          poster_url:
            'https://dummyimage.com/300x450/004d40/fff&text=Echoes+of+Tomorrow',
        },
      ];

      await this.movieRepo.save(movies);
      console.log(`🎬 Seeded ${movies.length} movies`);
    }

    const existingSeats = await this.seatRepo.find();
    if (existingSeats.length === 0) {
      const seats = Array.from({ length: 30 }, (_, i) => ({
        name: `M-${i + 1}`,
      }));
      await this.seatRepo.save(seats);
      console.log(`💺 Seeded ${seats.length} seats`);
    }

    console.log('✅ Seeding complete!');
  }
}
