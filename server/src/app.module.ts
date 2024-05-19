import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConcertsModule } from './concerts/concerts.module';
import { ReservationHistoriesModule } from './reservationHistories/reservationHistories.module';
import { ReservationsModule } from './reservations/reservations.module';

@Module({
  imports: [ConcertsModule, ReservationHistoriesModule, ReservationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
