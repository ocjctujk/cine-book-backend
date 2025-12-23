import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genre } from './genre.entity';
import { GenreController } from './genre.controller';
import { GenreService } from './genre.service';

@Module({
  imports: [TypeOrmModule.forFeature([Genre])],
  exports: [TypeOrmModule],
  controllers: [GenreController],
  providers: [GenreService],
})
export class GenreModule {}
