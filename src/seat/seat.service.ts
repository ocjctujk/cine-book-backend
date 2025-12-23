import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seat } from './seat.entity';
import { In, Repository } from 'typeorm';
import { GetSeatsDto } from './dto/get-seats.dto';

@Injectable()
export class SeatService {
  constructor(
    @InjectRepository(Seat)
    private readonly seatRepository: Repository<Seat>,
  ) {}
  async findAllByIds(dto: GetSeatsDto): Promise<Seat[]> {
    return this.seatRepository.find({
      where: {
        id: In(dto.ids),
      },
    });
  }
}
