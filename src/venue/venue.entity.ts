import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Screen } from '@src/screen/screen.entity';

@Entity()
export class Venue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({})
  name: string;

  @Column({})
  address: string;

  @OneToMany(() => Screen, (screen) => screen.venue, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  screens: Screen[];
}
