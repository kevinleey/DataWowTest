import { IsEnum, IsString } from 'class-validator';

export class CreateReservationHistoryDto {
  @IsString()
  username: string;

  @IsString()
  concertName: string;

  @IsEnum(['Reserve', 'Cancel'], {
    message: 'Valid action required',
  })
  action: 'Reserve' | 'Cancel';
}
