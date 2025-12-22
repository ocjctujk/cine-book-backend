import { Injectable } from '@nestjs/common';
import { Movie } from './movie.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}
  async findAll(): Promise<Movie[]> {
    return this.movieRepository.find({
      relations: {
        genres: {},
      },
    });
  }
}
