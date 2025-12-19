import { Seat } from '@src/seat/seat.entity';
import { Show } from '@src/show/show.entity';
import { Venue } from '@src/venue/venue.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Screen {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Show, (show) => show.venue)
  shows: Show[];

  @ManyToOne(() => Venue, (venue) => venue.screens, { eager: true })
  venue: Venue;

  @OneToMany(() => Seat, (seat) => seat.screen)
  seats: Seat[];
}
