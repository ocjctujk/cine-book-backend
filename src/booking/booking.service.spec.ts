import { Test, TestingModule } from '@nestjs/testing';
import { BookingService } from './booking.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Booking } from './booking.entity';
import { Show } from '@src/show/show.entity';
import { User } from '@src/users/user.entity';
import { Seat } from '@src/seat/seat.entity';

describe('BookingService', () => {
  let service: BookingService;

  beforeEach(async () => {
    const mockRepository = {
      find: jest.fn(),
      save: jest.fn(),
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingService,
        { provide: getRepositoryToken(Booking), useValue: mockRepository },
        { provide: getRepositoryToken(Show), useValue: mockRepository },
        { provide: getRepositoryToken(User), useValue: mockRepository },
        { provide: getRepositoryToken(Seat), useValue: mockRepository },
      ],
    }).compile();

    service = module.get<BookingService>(BookingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
