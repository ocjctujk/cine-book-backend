import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Certificate } from './certificate.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CertificatesService {
  constructor(
    @InjectRepository(Certificate)
    private readonly certificateRepository: Repository<Certificate>,
  ) {}
  async findAll(): Promise<Certificate[]> {
    return this.certificateRepository.find();
  }
}
