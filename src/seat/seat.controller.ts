import { Body, Controller, Get, Post } from '@nestjs/common';
import { SeatService } from './seat.service';

@Controller('seat')
export class SeatController {
  constructor(private readonly seatService: SeatService) {}
  @Post()
  findAllByIds(@Body() ids: { ids: number[] }) {
    return this.seatService.findAllByIds(ids.ids);
  }
}
