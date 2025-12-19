import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Certificate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    nullable: false,
  })
  name: string;

  @Column({
    default: 8,
  })
  min_age: number;
}
