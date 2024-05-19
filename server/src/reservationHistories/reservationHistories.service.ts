import { Injectable } from '@nestjs/common';
import { ReservationHistory } from './reservationHistory.model';

@Injectable()
export class ReservationHistoriesService {
  private reservationHistories: ReservationHistory[] = [];

  createReservation(
    username: string,
    concertName: string,
    reservationAction: 'Reserve' | 'Cancel',
  ) {
    const reservationHistoryId = Math.random().toString();
    const timestamp = new Date();
    const newReservation = new ReservationHistory(
      reservationHistoryId,
      username,
      concertName,
      timestamp,
      reservationAction,
    );
    this.reservationHistories.push(newReservation);
    return newReservation;
  }

  getAllReservations() {
    return [...this.reservationHistories];
  }
}
