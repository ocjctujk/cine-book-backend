import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ShowService } from './show.service';
import { CreateShowDto } from './create-show.dto';
import { AuthGuard } from '@src/auth/auth.guard';
import { RolesGuard } from '@src/auth/roles.guards';
import { Roles } from '@src/auth/roles.decorator';
import { UserRole } from '@src/users/user.entity';

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

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  create(@Body() createShowDto: CreateShowDto) {
    return this.showService.create(createShowDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get('venue') // ✅ no leading slash
  getByVenue(@Query('venue_id') venueId: number) {
    return this.showService.getByVenue(venueId);
  }
}
