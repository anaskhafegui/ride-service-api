import { Injectable } from '@nestjs/common';
import { TripService } from '../../trip.service';

@Injectable()
export class EstimateFareHandler {
  constructor(private readonly tripService: TripService) {}

  async execute(tripId: string, estimatedFare: number) {
    return this.tripService.estimateFare(tripId, estimatedFare);
  }
}
