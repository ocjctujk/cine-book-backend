import { Controller, Get, UseGuards } from '@nestjs/common';
import { GenreService } from './genre.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@src/auth/auth.guard';
import { RolesGuard } from '@src/auth/roles.guards';
import { Roles } from '@src/auth/roles.decorator';
import { UserRole } from '@src/users/user.entity';

@Controller('genres')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.SUPERADMIN)
  @Get()
  getAll() {
    return this.genreService.findAll();
  }
}
