import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './create-booking.dto';
import { AuthGuard } from '@src/auth/auth.guard';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get(':id')
  findUserBooking(@Param('id') id: number) {
    return this.bookingService.getUserBookings(id);
  }
  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() booking: CreateBookingDto): Promise<any> {
    try {
      return await this.bookingService.create(booking);
    } catch (error: any) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error.detail,
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }
}
