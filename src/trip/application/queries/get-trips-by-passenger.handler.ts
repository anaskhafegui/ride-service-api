import { Injectable } from '@nestjs/common';
import { Trip } from '../../domain/trip.aggregate';
import { TripService } from '../../trip.service';

@Injectable()
export class GetTripsByPassengerHandler {
  constructor(private readonly tripService: TripService) {}

  async execute(passengerId: string): Promise<Trip[]> {
    return this.tripService.getTripsByPassenger(passengerId);
  }
}
