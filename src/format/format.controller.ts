import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@src/auth/auth.guard';
import { RolesGuard } from '@src/auth/roles.guards';
import { Roles } from '@src/auth/roles.decorator';
import { UserRole } from '@src/users/user.entity';
import { FormatService } from './format.service';

@Controller('formats')
export class FormatController {
  constructor(private readonly formatService: FormatService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.SUPERADMIN)
  @Get()
  getAll() {
    return this.formatService.findAll();
  }
}
