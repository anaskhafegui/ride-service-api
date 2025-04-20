import { Injectable, NotFoundException } from '@nestjs/common';
import { Trip } from '../../domain/trip.aggregate';
import { TripService } from '../../trip.service';

@Injectable()
export class GetTripByIdHandler {
  constructor(private readonly tripService: TripService) {}

  async execute(tripId: string): Promise<Trip> {
    const trip = await this.tripService.getTripById(tripId);
    if (!trip) throw new NotFoundException('Trip not found');
    return trip;
  }
}
