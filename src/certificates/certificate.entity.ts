import { Movie } from '@src/movie/movie.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Certificate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    default: 'U',
  })
  name: string;

  @Column({
    default: 0,
  })
  age: number;

  @OneToMany(() => Movie, (movie) => movie.certificate)
  movies: Movie[];
}
