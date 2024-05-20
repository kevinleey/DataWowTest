import { IsInt, IsString } from 'class-validator';

export class CreateReservationDto {
  @IsString()
  username: string;

  @IsInt()
  concertId: number;
}
