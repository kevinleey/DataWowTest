import { Injectable, NotFoundException } from '@nestjs/common';
import { Concert } from './concert.model';
import { CreateConcertDto } from './dto/create-concert.dto';

@Injectable()
export class ConcertsService {
  private concerts: Concert[] = [];
  private nextId = 1;

  createConcert(concertDto: CreateConcertDto) {
    const { name, description, reservations } = concertDto;
    const concertId = this.nextId;
    this.nextId++;
    const newConcert = new Concert(concertId, name, description, reservations);
    this.concerts.push(newConcert);
    return newConcert;
  }

  getAllConcerts() {
    return [...this.concerts];
  }

  deleteConcert(concertId: number): boolean {
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
