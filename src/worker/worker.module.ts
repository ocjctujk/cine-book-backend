import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Worker } from './worker.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Worker])],
  exports: [TypeOrmModule],
})
export class WorkerModule {}
