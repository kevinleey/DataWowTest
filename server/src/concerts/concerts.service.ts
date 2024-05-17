import { Injectable } from '@nestjs/common';
import { Concert } from './concert.model';

@Injectable()
export class ConcertsService {
  private concerts: Concert[] = [];

  createConcert(name: string, description: string, totalSeats: number) {
    const concertId = new Date().toString();
    const newConcert = new Concert(concertId, name, description, totalSeats);
    this.concerts.push(newConcert);
    return concertId;
  }

  getAllProducts() {
    return [...this.concerts];
  }
}
