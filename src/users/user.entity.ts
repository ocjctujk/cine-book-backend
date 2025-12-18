import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 15 })
  firstName: string;

  @Column({ length: 15 })
  lastName: string;

  @Column({ length: 20, unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'varchar',
    length: 10,
    unique: true,
    nullable: true,
  })
  phone: string;

  @Column({
    nullable: true,
  })
  dob: Date;

  @Column({
    type: 'varchar',
    length: '30',
    nullable: true,
  })
  address_line_1: string;

  @Column({
    type: 'varchar',
    length: '30',
    nullable: true,
  })
  address_line_2: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: '15',
  })
  city: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: '15',
  })
  state: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: '6',
  })
  pincode: string;
}
