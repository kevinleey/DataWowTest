import { Injectable, NotFoundException } from '@nestjs/common';
import { Reservation } from './reservation.model';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Injectable()
export class ReservationsService {
  private reservations: Reservation[] = [];
  private nextId = 1;

  getAllReservations() {
    return [...this.reservations];
  }

  createReservation(reservationDto: CreateReservationDto) {
    const { username, concertId } = reservationDto;
    const reservationId = this.nextId;
    this.nextId++;
    const newReservation = new Reservation(reservationId, username, concertId);
    this.reservations.push(newReservation);
    return newReservation;
  }

  deleteReservation(reservationId: number): boolean {
    const reservationIndex = this.reservations.findIndex(
      (reservation) => reservation.id === reservationId,
    );
    if (reservationIndex === -1) {
      throw new NotFoundException('Reservation not found');
    }
    this.reservations.splice(reservationIndex, 1);
    return true;
  }

  getReservationByUsername(username: string): Reservation[] {
    return this.reservations.filter(
      (reservation) => reservation.username === username,
    );
  }
}
