import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { Reservation } from './reservation.model';

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
    @Body('username') username: string,
    @Body('concertId') concertId: string,
  ): any {
    const reservationId = this.reservationsService.createReservation(
      username,
      concertId,
    );
    return { id: reservationId };
  }

  @Delete(':id')
  deleteReservation(@Param('id') reservationId: string): any {
    const deletedReservation =
      this.reservationsService.deleteReservation(reservationId);
    if (!deletedReservation) {
      throw new NotFoundException('Reservation not found');
    }
    return { message: 'Reservation deleted successfully' };
  }
}
