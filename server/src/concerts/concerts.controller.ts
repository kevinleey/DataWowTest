import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { ConcertsService } from './concerts.service';

@Controller('concerts')
export class ConcertsController {
  constructor(private readonly concertsService: ConcertsService) {}
  @Post()
  createConcert(
    @Body('concertName') concertName: string,
    @Body('description') concertDesc: string,
    @Body('totalSeats') concertSeats: number,
  ): any {
    const generatedId = this.concertsService.createConcert(
      concertName,
      concertDesc,
      concertSeats,
    );
    return { id: generatedId };
  }
  @Get()
  getAllConcerts() {
    return this.concertsService.getAllProducts();
  }
}
