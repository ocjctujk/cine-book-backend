import { Show } from '@src/show/show.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Format {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Show, (show) => show.format, { eager: false })
  shows: Show[];
}
