import { Injectable } from '@nestjs/common';
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

  getAllProducts() {
    return [...this.concerts];
  }

  deleteConcert(concertId: string): boolean {
    const index = this.concerts.findIndex(
      (concert) => concert.id === concertId,
    );
    if (index !== -1) {
      this.concerts.splice(index, 1);
      return true;
    }
    return false;
  }
}
