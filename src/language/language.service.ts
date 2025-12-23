import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Language } from './language.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LanguageService {
  constructor(
    @InjectRepository(Language)
    private readonly langaugeRepository: Repository<Language>,
  ) {}
  async findAll(): Promise<Language[]> {
    return this.langaugeRepository.find();
  }
}
