import { Injectable } from '@nestjs/common';
import { TripService } from '../../trip.service';

@Injectable()
export class CaptureFareHandler {
  constructor(private readonly tripService: TripService) {}

  async execute(tripId: string, amount: number) {
    return this.tripService.captureFare(tripId, amount);
  }
}
