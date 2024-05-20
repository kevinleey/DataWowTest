import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { CreateReservationHistoryDto } from './dto/create-reservation-history.dto';
import { ReservationHistoriesService } from './reservationHistories.service';

@Controller('reservationHistories')
export class ReservationHistoriesController {
  constructor(
    private readonly ReservationHistoriesService: ReservationHistoriesService,
  ) {}

  @Post()
  createReservationHistory(
    @Body(ValidationPipe) reservationHistory: CreateReservationHistoryDto,
  ): any {
    return this.ReservationHistoriesService.createReservation(
      reservationHistory,
    );
  }

  @Get()
  getAllReservationHistories() {
    return this.ReservationHistoriesService.getAllReservations();
  }
}
