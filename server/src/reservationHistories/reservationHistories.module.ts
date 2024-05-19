import { Module } from '@nestjs/common';
import { ReservationHistoriesController } from './reservationHistories.controller';
import { ReservationHistoriesService } from './reservationHistories.service';

@Module({
  controllers: [ReservationHistoriesController],
  providers: [ReservationHistoriesService],
})
export class ReservationHistoriesModule {}
