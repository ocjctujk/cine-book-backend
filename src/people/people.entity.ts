import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class People {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    nullable: false,
  })
  name: string;

  @Column()
  type: 'cast' | 'crew';

  @Column({
    nullable: true,
  })
  image_url: string;
}
