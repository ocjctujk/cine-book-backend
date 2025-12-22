import { Module } from '@nestjs/common';
import { ShowController } from './show.controller';
import { ShowService } from './show.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Show } from './show.entity';
import { Booking } from '@src/booking/booking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Show, Booking])],
  controllers: [ShowController],
  providers: [ShowService],
  exports: [TypeOrmModule],
})
export class ShowModule {}
