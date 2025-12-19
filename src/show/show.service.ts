import { Injectable } from '@nestjs/common';
import { Show } from './show.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ShowService {
  constructor(
    @InjectRepository(Show)
    private readonly showRepository: Repository<Show>,
  ) {}
  async findAll(): Promise<Show[]> {
    return this.showRepository.find({
      relations: {
        movie: true,
      },
    });
  }
  async findByMovie(movieId: number): Promise<Show[]> {
    return this.showRepository.find({
      relations: {
        movie: true,
      },
      where: {
        movie: {
          id: movieId,
        },
      },
    });
  }
  async findOne(showId: number) {
    console.log('Finding single ID');
    return this.showRepository.findOne({
      relations: {
        movie: {},
        screen: {
          seats: {},
        },
      },
      where: {
        id: showId,
      },
    });
  }
}
