import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Format } from './format.entity';
import { FormatController } from './format.controller';
import { FormatService } from './format.service';

@Module({
  imports: [TypeOrmModule.forFeature([Format])],
  exports: [TypeOrmModule],
  controllers: [FormatController],
  providers: [FormatService],
})
export class FormatModule {}
