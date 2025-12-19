import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Language } from '@src/language/language.entity';
import { Genre } from '@src/genre/genre.entity';
import { Format } from '@src/format/format.entity';
import { Certificate } from '@src/certificates/certificate.entity';
import { People } from '@src/people/people.entity';
import { Offer } from '@src/offers/offers.entity';

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

  // --- Relationships ---

  @ManyToMany(() => Genre, { eager: true })
  @JoinTable()
  genres: Genre[];

  @ManyToMany(() => Language, { eager: true })
  @JoinTable()
  languages: Language[];

  @ManyToMany(() => Format, { eager: true })
  @JoinTable()
  formats: Format[];

  // One certificate per movie (Many movies can share one certificate)
  @ManyToOne(() => Certificate, { eager: true })
  certificate: Certificate;

  @ManyToMany(() => People, { eager: true })
  @JoinTable()
  people: People[];

  // One movie can have many offers
  @OneToMany(() => Offer, (offer) => offer.movie, {
    cascade: true,
    eager: true,
  })
  offers: Offer[];
}
