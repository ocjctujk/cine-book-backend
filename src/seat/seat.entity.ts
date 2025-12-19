import { Screen } from '@src/screen/screen.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Seat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  name: string; // e.g., "A1", "B10", "J25"

  @Column()
  columnLetter: string; // A to Z (single letter)

  @Column({ type: 'int' })
  rowNumber: number; // 1 to 30

  @Column({ type: 'boolean', default: true })
  available: boolean; // true if seat is available for booking

  @ManyToOne(() => Screen, (screen) => screen.seats)
  screen: Screen;
}
