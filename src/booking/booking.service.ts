import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, DeepPartial } from 'typeorm';
import { Booking } from './booking.entity';
import { CreateBookingDto } from './create-booking.dto';
import { Show } from '@src/show/show.entity';
import { User } from '@src/users/user.entity';
import { Seat } from '@src/seat/seat.entity';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
    @InjectRepository(Show)
    private showRepository: Repository<Show>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Seat)
    private seatRepository: Repository<Seat>,
  ) {}

  async getUserBookings(userId: number): Promise<Booking[]> {
    const user = await this.userRepository.findOneBy({
      id: userId,
    });
    if (!user) {
      return [];
    }
    return this.bookingRepository.find({
      where: {
        user: user,
      },
      relations: {
        show: {
          movie: {},
        },
        seats: {},
      },
      order: {
        show: {
          time: 'ASC',
        },
      },
    });
  }

  async create(dto: CreateBookingDto): Promise<Booking> {
    // 1. Fetch show, user, and seats
    const show = await this.showRepository.findOneBy({ id: dto.showId });
    if (!show) throw new NotFoundException('Show not found');

    const user = await this.userRepository.findOneBy({ id: dto.userId });
    if (!user) throw new NotFoundException('User not found');

    const seats = await this.seatRepository.findBy({ id: In(dto.seatIds) });
    if (seats.length !== dto.seatIds.length) {
      throw new NotFoundException('Some seats not found');
    }

    // 2. Check if any of these seats are already booked for this show
    const existingBookings = await this.bookingRepository
      .createQueryBuilder('booking')
      .leftJoin('booking.seats', 'seat')
      .leftJoin('booking.show', 'show')
      .where('show.id = :showId', { showId: dto.showId })
      .andWhere('seat.id IN (:...seatIds)', { seatIds: dto.seatIds })
      .getMany();

    if (existingBookings.length > 0) {
      const bookedSeatIds = existingBookings
        .flatMap((b) => b.seats.map((s) => s.id))
        .filter((id) => dto.seatIds.includes(id));

      throw new ConflictException(
        `Seats already booked: ${bookedSeatIds.join(', ')}`,
      );
    }

    // 3. Create and save the booking
    const booking = this.bookingRepository.create({
      amount: dto.amount,
      show,
      user,
      seats,
    } as DeepPartial<Booking>);

    return this.bookingRepository.save(booking);
  }
}
