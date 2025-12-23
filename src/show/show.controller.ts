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
import { ShowService } from './show.service';
import { CreateShowDto } from './create-show.dto';
import { AuthGuard } from '@src/auth/auth.guard';
import { RolesGuard } from '@src/auth/roles.guards';
import { Roles } from '@src/auth/roles.decorator';
import { UserRole } from '@src/users/user.entity';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

@Controller('shows')
export class ShowController {
  constructor(private readonly showService: ShowService) {}

  // @Get()
  // find(@Query('id') id?: number, @Query('movie_id') movieId?: number) {
  //   if (id) {
  //     return this.showService.findOne(id);
  //   }
  //   if (movieId) {
  //     return this.showService.findByMovie(movieId);
  //   }
  //   return this.showService.findAll();
  // }
  @Get('movie/:movieId')
  findByMovie(@Param('movieId', ParseIntPipe) movieId: number) {
    return this.showService.findByMovie(movieId);
  }

  // GET /shows/:id            → Get a single show by its own ID
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.showService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  create(@Body() createShowDto: CreateShowDto) {
    return this.showService.create(createShowDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get('venue/:id')
  getByVenue(@Param('id', ParseIntPipe) venueId: number) {
    return this.showService.getByVenue(venueId);
  }
}
