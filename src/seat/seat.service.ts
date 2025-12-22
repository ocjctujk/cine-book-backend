import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seat } from './seat.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class SeatService {
  constructor(
    @InjectRepository(Seat)
    private readonly seatRepository: Repository<Seat>,
  ) {}
  async findAllByIds(ids: number[]): Promise<Seat[]> {
    return this.seatRepository.find({
      where: {
        id: In(ids),
      },
    });
  }
}
