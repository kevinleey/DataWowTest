import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  NotFoundException,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { Reservation } from './reservation.model';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Get()
  getAllReservations() {
    return this.reservationsService.getAllReservations();
  }

  @Get(':id')
  getReservationsByUsername(
    @Param('username') username: string,
  ): Reservation[] {
    return this.reservationsService.getReservationByUsername(username);
  }
  @Post()
  createReservation(
    @Body(ValidationPipe) reservation: CreateReservationDto,
  ): any {
    const reservationId =
      this.reservationsService.createReservation(reservation);
    return { id: reservationId };
  }

  @Delete(':id')
  deleteReservation(@Param('id', ParseIntPipe) reservationId: number): any {
    const deletedReservation =
      this.reservationsService.deleteReservation(reservationId);
    if (!deletedReservation) {
      throw new NotFoundException('Reservation not found');
    }
    return { message: 'Reservation deleted successfully' };
  }
}
