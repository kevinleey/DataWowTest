import { Body, Controller, Get, Post } from '@nestjs/common';
import { ReservationHistoriesService } from './reservationHistories.service';

@Controller('reservationHistories')
export class ReservationHistoriesController {
  constructor(
    private readonly ReservationHistoriesService: ReservationHistoriesService,
  ) {}

  @Post()
  createReservationHistory(
    @Body('username') username: string,
    @Body('concertName') concertName: string,
    @Body('action') reservationAction: 'Reserve' | 'Cancel',
  ): any {
    return this.ReservationHistoriesService.createReservation(
      username,
      concertName,
      reservationAction,
    );
  }

  @Get()
  getAllReservationHistories() {
    return this.ReservationHistoriesService.getAllReservations();
  }
}
