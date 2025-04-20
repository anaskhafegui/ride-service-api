import { Injectable } from '@nestjs/common';
import { TripService } from '../../trip.service';
import { RequestTripDto } from '../dto/request-trip.dto';

@Injectable()
export class RequestTripHandler {
  constructor(private readonly tripService: TripService) {}

  async execute(dto: RequestTripDto) {
    return this.tripService.requestTrip(dto);
  }
}
