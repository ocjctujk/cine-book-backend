import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { People } from './people.entity';

@Module({
  imports: [TypeOrmModule.forFeature([People])],
  exports: [TypeOrmModule],
})
export class CertificateModule {}
