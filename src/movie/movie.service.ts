import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './movie.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMovieDto } from './create-movie.dto';
import { Certificate } from '@src/certificates/certificate.entity';
import { Genre } from '@src/genre/genre.entity';
import { Worker } from '@src/worker/worker.entity';
import { Language } from '@src/language/language.entity';
import { Format } from '@src/format/format.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,

    @InjectRepository(Certificate)
    private readonly certificateRepository: Repository<Certificate>,

    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,

    @InjectRepository(Worker)
    private readonly workerRepository: Repository<Worker>,

    @InjectRepository(Language)
    private readonly languageRepository: Repository<Language>,

    @InjectRepository(Format)
    private readonly formatRepository: Repository<Format>,
  ) {}

  async findAll(): Promise<Movie[]> {
    return this.movieRepository.find({
      relations: {
        genres: {},
      },
    });
  }
  async findOne(movieId: number): Promise<Movie> {
    const movie = await this.movieRepository.findOne({
      relations: {
        genres: {},
      },
      where: {
        id: movieId,
      },
    });
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
    return movie;
  }

  async create(createMovieDto: CreateMovieDto) {
    const {
      name,
      description,
      release_date,
      poster_url,
      duration,
      certificateId,
      genreIds,
      workerIds,
      languageIds,
      formatIds,
    } = createMovieDto;

    // Fetch related entities
    const certificate = await this.certificateRepository.findOneBy({
      id: certificateId,
    });
    if (!certificate)
      throw new Error(`Certificate with ID ${certificateId} not found`);

    const genres = await this.genreRepository.findBy({ id: In(genreIds) });
    const workers = await this.workerRepository.findBy({ id: In(workerIds) });
    const languages = await this.languageRepository.findBy({
      id: In(languageIds),
    });
    const formats = await this.formatRepository.findBy({ id: In(formatIds) });

    // Create the movie entity
    const movie = this.movieRepository.create({
      name,
      description,
      release_date,
      poster_url,
      duration,
      certificate,
      genres,
      workers,
      languages,
      formats,
    });

    // Save to database
    return await this.movieRepository.save(movie);
  }
}
