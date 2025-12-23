import { Body, Controller, Post } from '@nestjs/common';
import { SeatService } from './seat.service';
import { GetSeatsDto } from './dto/get-seats.dto';

@Controller('seats')
export class SeatController {
  constructor(private readonly seatService: SeatService) {}
  @Post()
  findAllByIds(@Body() dto: GetSeatsDto) {
    return this.seatService.findAllByIds(dto);
  }
}
