// src/seeder/seeder.service.ts
import { Injectable } from '@nestjs/common';
import { Repository, ObjectLiteral } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from '@src/movie/movie.entity';
import { Seat } from '@src/seat/seat.entity';
import { Screen } from '@src/screen/screen.entity';
import { Show } from '@src/show/show.entity';
import { Venue } from '@src/venue/venue.entity';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepo: Repository<Movie>,
    @InjectRepository(Seat)
    private readonly seatRepo: Repository<Seat>,
    @InjectRepository(Screen)
    private readonly screenRepo: Repository<Screen>,
    @InjectRepository(Show)
    private readonly showRepo: Repository<Show>,
    @InjectRepository(Venue)
    private readonly venueRepo: Repository<Venue>,
  ) {}

  private async seedFromFile<T extends ObjectLiteral>(
    filePath: string,
    repo: Repository<T>,
    key?: string,
  ): Promise<T[]> {
    const absolutePath = path.resolve(__dirname, filePath);
    const rawData = fs.readFileSync(absolutePath, 'utf8');
    let parsedData: unknown = JSON.parse(rawData);

    if (key) parsedData = (parsedData as Record<string, unknown>)[key];
    if (!Array.isArray(parsedData))
      throw new Error(`Invalid data format in ${filePath}`);

    const data = parsedData as T[];
    const count = await repo.count();
    if (count === 0) {
      await repo.save(data);
      console.log(`✅ Seeded ${data.length} records from ${filePath}`);
    } else {
      console.log(
        `⚠️  ${repo.metadata.name} already contains data, skipping seeding.`,
      );
    }

    return repo.find();
  }

  async seed() {
    console.log('🌱 Starting database seeding...');

    // 1️⃣ Seed venues first
    const venues = await this.seedFromFile<Venue>(
      '../../BackendDump/venues.json',
      this.venueRepo,
      'venue',
    );

    // 2️⃣ Seed screens with random venues
    await this.seedScreensWithVenues(venues);

    // 3️⃣ Seed seats with random screens
    await this.seedSeatsWithScreens();

    // 4️⃣ Seed movies (independent)
    await this.seedFromFile<Movie>(
      '../../BackendDump/movies.json',
      this.movieRepo,
      'movie',
    );

    // 5️⃣ Seed shows with random relationships
    await this.seedShowsWithRelationships();

    console.log('🌿 All seeding complete!');
  }

  private async seedScreensWithVenues(venues: Venue[]): Promise<void> {
    const filePath = '../../BackendDump/screens.json';
    const absolutePath = path.resolve(__dirname, filePath);

    const rawData = fs.readFileSync(absolutePath, 'utf8');
    const parsedData: { screen: any[] } = JSON.parse(rawData);
    const screensData = parsedData.screen;

    const count = await this.screenRepo.count();
    if (count === 0) {
      const getRandom = <T>(arr: T[]): T =>
        arr[Math.floor(Math.random() * arr.length)];

      for (const screenData of screensData) {
        const screen = new Screen();
        Object.assign(screen, screenData);

        // 🎲 Random venue assignment
        screen.venue = getRandom(venues);

        await this.screenRepo.save(screen);
      }

      console.log(`✅ Seeded ${screensData.length} screens with random venues`);
    } else {
      console.log(`⚠️  Screens already exist, skipping seeding.`);
    }
  }

  private async seedSeatsWithScreens(): Promise<void> {
    const filePath = '../../BackendDump/seats.json';
    const absolutePath = path.resolve(__dirname, filePath);

    const rawData = fs.readFileSync(absolutePath, 'utf8');
    const parsedData: { seat: any[] } = JSON.parse(rawData);
    const seatsData = parsedData.seat;

    const count = await this.seatRepo.count();
    if (count === 0) {
      const screens = await this.screenRepo.find();
      if (!screens.length) throw new Error('❌ No screens found for seats!');

      const getRandom = <T>(arr: T[]): T =>
        arr[Math.floor(Math.random() * arr.length)];

      for (const seatData of seatsData) {
        const seat = new Seat();
        Object.assign(seat, seatData);

        // 🎲 Random screen assignment
        seat.screen = getRandom(screens);

        await this.seatRepo.save(seat);
      }

      console.log(`✅ Seeded ${seatsData.length} seats with random screens`);
    } else {
      console.log(`⚠️  Seats already exist, skipping seeding.`);
    }
  }

  private async seedShowsWithRelationships(): Promise<void> {
    const filePath = '../../BackendDump/shows.json';
    const absolutePath = path.resolve(__dirname, filePath);

    const rawData = fs.readFileSync(absolutePath, 'utf8');
    const parsedData: { show: any[] } = JSON.parse(rawData);
    const showsData = parsedData.show;

    const count = await this.showRepo.count();
    if (count === 0) {
      const allMovies = await this.movieRepo.find();
      const allVenues = await this.venueRepo.find();
      const allScreens = await this.screenRepo.find();

      if (!allMovies.length) throw new Error('❌ No movies found to assign!');
      if (!allVenues.length) throw new Error('❌ No venues found to assign!');
      if (!allScreens.length) throw new Error('❌ No screens found to assign!');

      const getRandom = <T>(arr: T[]): T =>
        arr[Math.floor(Math.random() * arr.length)];

      for (const showData of showsData) {
        const show = new Show();
        show.time = new Date(showData.time);
        show.cost = showData.cost;

        // 🎲 Assign random relationships
        show.movie = getRandom(allMovies);
        show.venue = getRandom(allVenues);
        show.screen = getRandom(allScreens);

        await this.showRepo.save(show);
      }

      console.log(
        `✅ Seeded ${showsData.length} shows with random relationships`,
      );
    } else {
      console.log(`⚠️  Shows already exist, skipping seeding.`);
    }
  }
}
