import { Injectable } from '@nestjs/common';
import { TripStatusEnum } from '../../domain/enums/trip-status.enum';
import { TripService } from '../../trip.service';

@Injectable()
export class UpdateTripStatusHandler {
  constructor(private readonly tripService: TripService) {}

  async execute(tripId: string, status: TripStatusEnum) {
    return this.tripService.updateTripStatus(tripId, status);
  }
}
