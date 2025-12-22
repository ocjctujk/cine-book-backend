import { Certificate } from '@src/certificates/certificate.entity';
import { Format } from '@src/format/format.entity';
import { Genre } from '@src/genre/genre.entity';
import { Language } from '@src/language/language.entity';
import { Show } from '@src/show/show.entity';
import { Worker } from '@src/worker/worker.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';

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

  @ManyToOne(() => Certificate, (cert) => cert.movies, { eager: true })
  certificate: Certificate;

  @ManyToMany(() => Genre, { eager: true })
  @JoinTable()
  genres: Genre[];

  @ManyToMany(() => Worker, { eager: true })
  @JoinTable()
  workers: Worker[];

  @ManyToMany(() => Language, { eager: true })
  @JoinTable()
  languages: Language[];

  @ManyToMany(() => Format, { eager: true })
  @JoinTable()
  formats: Format[];
}
