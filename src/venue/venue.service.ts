import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Venue } from './venue.entity';
import { Repository } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { AuthGuard } from '@src/auth/auth.guard';
import { User } from '@src/users/user.entity';

@Injectable()
export class VenueService {
  constructor(
    @InjectRepository(Venue)
    private venueRepository: Repository<Venue>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async findByUser(user_id: number): Promise<Venue[]> {
    const user = await this.userRepository.findOneBy({
      id: user_id,
    });
    if (!user) {
      throw new BadRequestException('user not found');
    }

    return await this.venueRepository.find({
      where: {
        user: user,
      },
      relations: {
        screens: true,
      },
    });
  }
}
