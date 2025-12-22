import { Seat } from '@src/seat/seat.entity';
import { Show } from '@src/show/show.entity';
import { User } from '@src/users/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @ManyToOne(() => Show, (show) => show.bookings, { eager: false })
  show: Show;

  @ManyToOne(() => User, (user) => user.bookings, { eager: false })
  user: User;

  @ManyToMany(() => Seat)
  @JoinTable()
  seats: Seat[];
}
