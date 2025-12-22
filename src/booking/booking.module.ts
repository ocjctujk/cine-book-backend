import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './booking.entity';
import { Show } from '@src/show/show.entity';
import { User } from '@src/users/user.entity';
import { Seat } from '@src/seat/seat.entity';
import { UsersService } from '@src/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, Show, User, Seat])],
  controllers: [BookingController],
  providers: [BookingService, UsersService],
})
export class BookingModule {}
