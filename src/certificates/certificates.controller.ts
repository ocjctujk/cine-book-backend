import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@src/auth/auth.guard';
import { Roles } from '@src/auth/roles.decorator';
import { RolesGuard } from '@src/auth/roles.guards';
import { UserRole } from '@src/users/user.entity';
import { CertificatesService } from './certificates.service';

@Controller('certificates')
export class CertificatesController {
  constructor(private readonly certificateService: CertificatesService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.SUPERADMIN)
  @Get()
  getAll() {
    return this.certificateService.findAll();
  }
}
