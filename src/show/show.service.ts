import { BadRequestException, Injectable } from '@nestjs/common';
import { Show } from './show.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from '@src/booking/booking.entity';
import { CreateShowDto } from './create-show.dto';
import { Movie } from '@src/movie/movie.entity';
import { Venue } from '@src/venue/venue.entity';
import { Language } from '@src/language/language.entity';
import { Format } from '@src/format/format.entity';
import { Screen } from '@src/screen/screen.entity';

@Injectable()
export class ShowService {
  constructor(
    @InjectRepository(Show)
    private readonly showRepository: Repository<Show>,
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    @InjectRepository(Venue)
    private readonly venueRepository: Repository<Venue>,
    @InjectRepository(Screen)
    private readonly screenRepository: Repository<Screen>,
    @InjectRepository(Language)
    private readonly languageRepository: Repository<Language>,
    @InjectRepository(Format)
    private readonly formatRepository: Repository<Format>,
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
        language: true,
        format: true,
      },
      where: {
        movie: {
          id: movieId,
        },
      },
    });
  }
  async findOne(showId: number) {
    const show = await this.showRepository.findOne({
      relations: {
        movie: {
          genres: true,
        },
        screen: {
          seats: true,
        },
        language: true,
        format: true,
      },
      where: { id: showId },
    });

    if (!show) {
      throw new Error('Show not found');
    }

    // Fetch all bookings for this show, including the seats booked
    const bookings = await this.bookingRepository.find({
      where: { show: { id: showId } },
      relations: { seats: true },
    });

    // Extract all booked seat IDs
    const bookedSeatIds = bookings.flatMap((booking) =>
      booking.seats.map((seat) => seat.id),
    );

    // Mark each seat as booked/unavailable
    show.screen.seats = show.screen.seats.map((seat) => ({
      ...seat,
      isBooked: bookedSeatIds.includes(seat.id),
    }));

    // ✅ Group seats by columnLetter
    const groupedSeats = show.screen.seats.reduce(
      (acc, seat) => {
        if (!acc[seat.columnLetter]) acc[seat.columnLetter] = [];
        acc[seat.columnLetter].push(seat);
        return acc;
      },
      {} as Record<string, typeof show.screen.seats>,
    );

    // ✅ Sort each column by rowNumber and sort columns alphabetically (A, B, C, D...)
    const sortedGroupedSeats = Object.keys(groupedSeats)
      .sort((a, b) => a.localeCompare(b)) // columnLetter order
      .reduce(
        (acc, key) => {
          acc[key] = groupedSeats[key].sort(
            (a, b) => a.rowNumber - b.rowNumber,
          );
          return acc;
        },
        {} as Record<string, typeof show.screen.seats>,
      );

    // ✅ Replace the flat seats array with grouped and sorted structure
    show.screen.seats = sortedGroupedSeats as any;

    return show;
  }
  async create(show: CreateShowDto): Promise<Show> {
    const newShow = this.showRepository.create(show);
    const movie = await this.movieRepository.findOneBy({ id: show.movieId });
    if (!movie) {
      throw new BadRequestException('Movie not found');
    }
    newShow.movie = movie;
    const venue = await this.venueRepository.findOneBy({ id: show.venueId });
    if (!venue) {
      throw new BadRequestException('Venue not found');
    }
    newShow.venue = venue;
    const screen = await this.screenRepository.findOneBy({ id: show.screenId });
    if (!screen) {
      throw new BadRequestException('Screen not found');
    }
    newShow.screen = screen;
    const language = await this.languageRepository.findOneBy({
      id: show.languageId,
    });
    if (!language) {
      throw new BadRequestException('Language not found');
    }
    newShow.language = language;
    const format = await this.formatRepository.findOneBy({ id: show.formatId });
    if (!format) {
      throw new BadRequestException('Format not found');
    }
    newShow.format = format;
    return this.showRepository.save(newShow);
  }

  async getByVenue(venueId: number) {
    console.log('getting by Venue');
    const venue = await this.venueRepository.findOneBy({
      id: venueId,
    });
    if (!venue) {
      throw new BadRequestException('Venue not found');
    }
    const show = await this.showRepository.find({
      where: {
        venue: venue,
      },
      relations: {
        language: true,
        format: true,
        movie: true,
      },
    });
    return show;
  }
}
