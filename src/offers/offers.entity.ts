import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Movie } from '@src/movie/movie.entity';

@Entity()
export class Offer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  terms: string;

  @Column('decimal', { precision: 5, scale: 2 })
  discount: number;

  @ManyToOne(() => Movie, (movie) => movie.offers)
  movie: Movie;
}
