import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venue } from './venue.entity';
import { VenueController } from './venue.controller';
import { VenueService } from './venue.service';
import { User } from '@src/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Venue, User])],
  exports: [TypeOrmModule],
  controllers: [VenueController],
  providers: [VenueService],
})
export class VenueModule {}
