import { Injectable } from '@nestjs/common';
import { Show } from './show.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from '@src/booking/booking.entity';

@Injectable()
export class ShowService {
  constructor(
    @InjectRepository(Show)
    private readonly showRepository: Repository<Show>,
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
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
}
