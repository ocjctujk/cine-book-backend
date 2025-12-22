import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seat } from './seat.entity';
import { SeatService } from './seat.service';
import { SeatController } from './seat.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Seat])],
  exports: [TypeOrmModule],
  providers: [SeatService],
  controllers: [SeatController],
})
export class SeatModule {}
