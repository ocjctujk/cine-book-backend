import { IsNumber, IsPositive, IsArray, ArrayNotEmpty } from 'class-validator';

export class CreateBookingDto {
  @IsNumber()
  @IsPositive()
  amount: number;

  @IsNumber()
  showId: number; // ID of the show being booked

  @IsNumber()
  userId: number; // ID of the user making the booking

  @IsArray()
  @ArrayNotEmpty()
  seatIds: number[]; // IDs of the seats being booked
}
