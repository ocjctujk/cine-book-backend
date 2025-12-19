// src/seeder/seeder.service.ts
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Genre } from '@src/genre/genre.entity';
import { Language } from '@src/language/language.entity';
import { Format } from '@src/format/format.entity';
import { Certificate } from '@src/certificates/certificate.entity';
import { Movie } from '@src/movie/movie.entity';
import { Seat } from '@src/seat/seat.entity';
import { SeatClass } from '@src/seatClass/seat-class.entity';
import { Screen } from '@src/screen/screen.entity';
import { Venue } from '@src/venue/venue.entity';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(Genre)
    private readonly genreRepo: Repository<Genre>,
    @InjectRepository(Language)
    private readonly languageRepo: Repository<Language>,
    @InjectRepository(Format)
    private readonly formatRepo: Repository<Format>,
    @InjectRepository(Certificate)
    private readonly certificateRepo: Repository<Certificate>,
    @InjectRepository(Movie)
    private readonly movieRepo: Repository<Movie>,
    @InjectRepository(Seat)
    private readonly seatRepo: Repository<Seat>,
    @InjectRepository(SeatClass)
    private readonly seatClassRepo: Repository<SeatClass>,
    @InjectRepository(Screen)
    private readonly screenRepo: Repository<Screen>,
    @InjectRepository(Venue)
    private readonly venueRepo: Repository<Screen>,
  ) {}

  async seed() {
    console.log('🌱 Starting database seeding...');

    // Example: Seed genres
    const existingGenres = await this.genreRepo.find();
    if (existingGenres.length === 0) {
      await this.genreRepo.save([
        { name: 'Action' },
        { name: 'Drama' },
        { name: 'Comedy' },
      ]);
    }
    const existingLanguages = await this.languageRepo.find();
    if (existingLanguages.length === 0) {
      await this.languageRepo.save([
        { name: 'English' },
        { name: 'Hindi' },
        { name: 'Kanadda' },
      ]);
    }
    const existingFormats = await this.formatRepo.find();
    if (existingFormats.length === 0) {
      await this.formatRepo.save([
        { name: '3D' },
        { name: '2D' },
        { name: 'IMax' },
      ]);
    }
    const existingCertificates = await this.certificateRepo.find();
    if (existingCertificates.length === 0) {
      await this.certificateRepo.save([
        { name: 'A+', min_age: 18 },
        { name: 'UA', min_age: 13 },
      ]);
    }
    const existingMovies = await this.movieRepo.find();
    if (existingMovies.length === 0) {
      const genre = await this.genreRepo.findOneBy({ name: 'Action' });
      const language = await this.languageRepo.findOneBy({ name: 'English' });
      const format = await this.formatRepo.findOneBy({ name: '3D' });
      const certificate = await this.certificateRepo.findOneBy({
        name: 'A+',
      });
      const movie = new Movie();
      movie.name = 'Dhurandhar';
      movie.description = 'Its a good movie starring Ranbern Singh';
      movie.release_date = new Date();
      movie.poster_url = '';
      movie.duration = 138;
      if (genre) movie.genres = [genre];
      if (language) movie.languages = [language];
      if (format) movie.formats = [format];
      if (certificate) movie.certificate = certificate;
      movie.people = [];

      await this.movieRepo.save(movie);
    }
    const existingVenue = await this.venueRepo.find();
    if (existingVenue.length === 0) {
      await this.venueRepo.save([
        {
          name: 'Wide Angle',
          address: 'Near SG Highway, Ahmedabad',
        },
      ]);
    }
    const venue = await this.venueRepo.findOneBy({ name: 'Wide Angle' });
    const existingScreen = await this.screenRepo.find();
    if (existingScreen.length === 0) {
      await this.screenRepo.save([
        {
          name: 'Screen-1',
          ...(venue ? { venue } : {}),
        },
      ]);
    }
    const screen = await this.screenRepo.findOneBy({ name: 'Screen-1' });
    const existingSeatClass = await this.seatClassRepo.find();
    if (existingSeatClass.length === 0) {
      await this.seatClassRepo.save([
        {
          name: 'GOLD',
          ...(screen ? { screen } : {}),
        },
      ]);
    }
    const seatClass = await this.seatClassRepo.findOneBy({ name: 'GOLD' });
    console.log(seatClass);
    const existingSeats = await this.seatRepo.find();
    if (existingSeats.length === 0) {
      await this.seatRepo.save([
        {
          name: 'M-1',
          ...(seatClass ? { seatClass } : {}),
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
