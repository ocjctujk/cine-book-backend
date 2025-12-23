import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Certificate } from './certificate.entity';
import { CertificatesController } from './certificates.controller';
import { CertificatesService } from './certificates.service';

@Module({
  imports: [TypeOrmModule.forFeature([Certificate])],
  exports: [TypeOrmModule],
  controllers: [CertificatesController],
  providers: [CertificatesService],
})
export class CertificateModule {}
