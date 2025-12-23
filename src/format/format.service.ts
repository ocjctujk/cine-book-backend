import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Format } from './format.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FormatService {
  constructor(
    @InjectRepository(Format)
    private readonly formatRepository: Repository<Format>,
  ) {}
  async findAll(): Promise<Format[]> {
    return this.formatRepository.find();
  }
}
