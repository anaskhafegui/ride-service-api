import { Injectable } from '@nestjs/common';
import { TripService } from '../../domain-service/trip.service';

@Injectable()
export class AssignDriverHandler {
  constructor(private readonly tripService: TripService) {}

  async execute(tripId: string, driverId: string) {
    return this.tripService.assignDriver(tripId, driverId);
  }
}
