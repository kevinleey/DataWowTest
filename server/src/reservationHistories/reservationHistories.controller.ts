import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
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
    return this.ReservationHistoriesService.createReservationHistory(
      reservationHistory,
    );
  }

  @Get()
  getAllReservationHistories() {
    return this.ReservationHistoriesService.getAllReservationHistories();
  }

  @Get(':username')
  getReservationHistoriesByUsername(@Param('username') username: string) {
    return this.ReservationHistoriesService.getReservationHistoriesByUsername(
      username,
    );
  }
}
