import { Injectable } from '@nestjs/common';
import { ReservationHistory } from './reservationHistory.model';
import { CreateReservationHistoryDto } from './dto/create-reservation-history.dto';

@Injectable()
export class ReservationHistoriesService {
  private reservationHistories: ReservationHistory[] = [];
  private nextId = 1;

  createReservationHistory(reservationHistoryDto: CreateReservationHistoryDto) {
    const { username, concertName, action } = reservationHistoryDto;
    const reservationHistoryId = this.nextId;
    this.nextId++;
    const timestamp = new Date();
    const newReservation = new ReservationHistory(
      reservationHistoryId,
      username,
      concertName,
      timestamp,
      action,
    );
    this.reservationHistories.push(newReservation);
    return newReservation;
  }

  getAllReservationHistories() {
    return [...this.reservationHistories];
  }

  getReservationHistoriesByUsername(username: string) {
    return this.reservationHistories.filter(
      (history) => history.username === username,
    );
  }
}
