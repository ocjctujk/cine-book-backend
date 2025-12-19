import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeatClass } from './seat-class.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SeatClass])],
  exports: [TypeOrmModule],
})
export class SeatClassModule {}
