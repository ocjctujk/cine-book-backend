import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { VenueService } from './venue.service';
import { AuthGuard } from '@src/auth/auth.guard';
import { RolesGuard } from '@src/auth/roles.guards';
import { Roles } from '@src/auth/roles.decorator';
import { UserRole } from '@src/users/user.entity';

@Controller('venue')
export class VenueController {
  constructor(private readonly venueService: VenueService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get()
  venuesByUser(@Query('user_id') userId: number) {
    return this.venueService.findByUser(userId);
  }
}
