import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@src/auth/auth.guard';
import { RolesGuard } from '@src/auth/roles.guards';
import { Roles } from '@src/auth/roles.decorator';
import { UserRole } from '@src/users/user.entity';
import { CreateMovieDto } from './create-movie.dto';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  findAll() {
    return this.movieService.findAll();
  }
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) movieId: number) {
    return this.movieService.findOne(movieId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.SUPERADMIN)
  @Post()
  createMovie(@Body() createMovieDto: CreateMovieDto) {
    return this.movieService.create(createMovieDto);
  }
}
