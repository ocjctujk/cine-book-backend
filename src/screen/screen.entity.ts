import { Venue } from '@src/venue/venue.entity';
import { SeatClass } from '@src/seatClass/seat-class.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Screen {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  name: string;

  @OneToMany(() => SeatClass, (seatClass) => seatClass.screen, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  seatClass: SeatClass[];

  @ManyToOne(() => Venue, (venue) => venue.screens)
  venue: Venue;
}
