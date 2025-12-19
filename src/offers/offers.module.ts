import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Offer } from './offers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Offer])],
  exports: [TypeOrmModule],
})
export class CertificateModule {}
