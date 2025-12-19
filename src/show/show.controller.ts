import { Controller, Get, Query } from '@nestjs/common';
import { ShowService } from './show.service';

@Controller('shows')
export class ShowController {
  constructor(private readonly showService: ShowService) {}

  @Get()
  find(@Query('id') id?: number, @Query('movie_id') movieId?: number) {
    if (id) {
      return this.showService.findOne(id);
    }

    if (movieId) {
      return this.showService.findByMovie(movieId);
    }

    return this.showService.findAll();
  }
}
