import { Booking } from '@src/booking/booking.entity';
import { Format } from '@src/format/format.entity';
import { Language } from '@src/language/language.entity';
import { Movie } from '@src/movie/movie.entity';
import { Screen } from '@src/screen/screen.entity';
import { Venue } from '@src/venue/venue.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Show {
  @PrimaryGeneratedColumn()
  id: number;

  // Use a Date type for timestamps (TypeORM maps it properly)
  @Column({ type: 'timestamp' })
  time: Date;

  @Column({ type: 'decimal' })
  cost: number;

  @ManyToOne(() => Movie, (movie) => movie.shows, { eager: false })
  movie: Movie;

  @ManyToOne(() => Venue, (venue) => venue.shows, { eager: true })
  venue: Venue;

  @ManyToOne(() => Screen, (screen) => screen.shows, { eager: true })
  screen: Screen;

  @OneToMany(() => Booking, (booking) => booking.show, { eager: false })
  bookings: Booking[];

  @ManyToOne(() => Language, (language) => language.shows, { eager: false })
  language: Language;

  @ManyToOne(() => Format, (format) => format.shows, { eager: false })
  format: Format;
}
