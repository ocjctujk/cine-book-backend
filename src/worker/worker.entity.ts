import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
enum WorkerRole {
  CREW = 'crew',
  CAST = 'cast',
}
@Entity()
export class Worker {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  @Column()
  image_url: string;

  @Column()
  introduction: string;

  @Column({ type: 'enum', enum: WorkerRole, default: WorkerRole.CREW })
  type: string;
}
