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
        movie: true,
        screen: {
          seats: true,
        },
      },
      where: { id: showId },
    });

    if (!show) {
      throw new Error('Show not found');
    }

    // Fetch all bookings for this show, including the seats booked
    const bookings = await this.bookingRepository.find({
      where: { show: { id: showId } },
      relations: { seats: true }, // assuming Booking has seats relation
    });

    // Extract all booked seat IDs
    const bookedSeatIds = bookings.flatMap((booking) =>
      booking.seats.map((seat) => seat.id),
    );

    // Mark each seat in the show as booked/unavailable
    show.screen.seats = show.screen.seats.map((seat) => ({
      ...seat,
      isBooked: bookedSeatIds.includes(seat.id),
    }));

    return show;
  }
}
