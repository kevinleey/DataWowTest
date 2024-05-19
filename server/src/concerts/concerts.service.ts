import { Injectable, NotFoundException } from '@nestjs/common';
import { Concert } from './concert.model';

@Injectable()
export class ConcertsService {
  private concerts: Concert[] = [];

  createConcert(name: string, description: string, totalSeats: number) {
    const concertId = Math.random().toString();
    const newConcert = new Concert(concertId, name, description, totalSeats);
    this.concerts.push(newConcert);
    return concertId;
  }

  getAllConcerts() {
    return [...this.concerts];
  }

  deleteConcert(concertId: string): boolean {
    const concertIndex = this.concerts.findIndex(
      (concert) => concert.id === concertId,
    );
    if (concertIndex === -1) {
      throw new NotFoundException('Concert not found');
    }
    this.concerts.splice(concertIndex, 1);
    return true;
  }
}
