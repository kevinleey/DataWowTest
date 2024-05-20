import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  ParseIntPipe,
  ValidationPipe,
  NotFoundException,
} from '@nestjs/common';
import { CreateConcertDto } from './dto/create-concert.dto';
import { ConcertsService } from './concerts.service';

@Controller('concerts')
export class ConcertsController {
  constructor(private readonly concertsService: ConcertsService) {}
  @Post()
  createConcert(@Body(ValidationPipe) concert: CreateConcertDto): any {
    return this.concertsService.createConcert(concert);
  }
  @Get()
  getAllConcerts() {
    return this.concertsService.getAllConcerts();
  }

  @Delete(':id')
  deleteConcert(@Param('id', ParseIntPipe) concertId: number): any {
    const deletedConcert = this.concertsService.deleteConcert(concertId);
    if (!deletedConcert) {
      throw new NotFoundException('Concert not found');
    }
    return { message: 'Concert deleted successfully' };
  }
}
