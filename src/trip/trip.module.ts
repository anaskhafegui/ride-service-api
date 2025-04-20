import { Module } from '@nestjs/common';
import { TripController } from './apis/trip.controller';
import { TripService } from './domain-service/trip.service';

@Module({
  controllers: [TripController],
  providers: [TripService],
})
export class TripModule {}
