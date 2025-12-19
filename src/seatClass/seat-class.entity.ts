import { Screen } from '@src/screen/screen.entity';
import { Seat } from '@src/seat/seat.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class SeatClass {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  name: string;

  @OneToMany(() => Seat, (seat) => seat.seatClass, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  seats: Seat[];

  @ManyToOne(() => Screen, (screen) => screen.seatClass)
  screen: Screen;
}
