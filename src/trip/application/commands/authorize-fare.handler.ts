import { Injectable } from '@nestjs/common';
import { TripService } from '../../domain-service/trip.service';

@Injectable()
export class AuthorizeFareHandler {
  constructor(private readonly tripService: TripService) {}

  async execute(tripId: string, amount: number) {
    return this.tripService.authorizeFare(tripId, amount);
  }
}
