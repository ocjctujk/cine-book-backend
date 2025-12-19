import { Show } from '@src/show/show.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'date' })
  release_date: Date;

  @Column()
  poster_url: string;

  @Column()
  duration: number;

  @OneToMany(() => Show, (show) => show.movie)
  shows: Show[];
}
