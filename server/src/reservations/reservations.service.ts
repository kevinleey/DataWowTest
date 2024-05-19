import { Injectable, NotFoundException } from '@nestjs/common';
import { Reservation } from './reservation.model';

@Injectable()
export class ReservationsService {
  private reservations: Reservation[] = [];

  getAllReservations() {
    return [...this.reservations];
  }

  createReservation(username: string, concertId: string) {
    const reservationId = Math.random().toString();
    const newReservation = new Reservation(reservationId, username, concertId);
    this.reservations.push(newReservation);
    return reservationId;
  }

  deleteReservation(reservationId: string): boolean {
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
