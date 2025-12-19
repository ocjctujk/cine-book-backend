import { Screen } from '@src/screen/screen.entity';
import { Show } from '@src/show/show.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Venue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address_line_1: string;

  @Column()
  address_line_2: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @OneToMany(() => Show, (show) => show.venue)
  shows: Show[];

  @OneToMany(() => Screen, (screen) => screen.venue)
  screens: Screen[];
}
