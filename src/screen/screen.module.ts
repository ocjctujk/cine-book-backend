import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Screen } from './screen.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Screen])],
  exports: [TypeOrmModule],
})
export class SeatModule {}
