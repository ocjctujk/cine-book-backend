import { SeatClass } from '@src/seatClass/seat-class.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Seat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  name: string;

  @ManyToOne(() => SeatClass, (seatClass) => seatClass.seats)
  seatClass: SeatClass;
}
