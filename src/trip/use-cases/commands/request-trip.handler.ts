import { Injectable } from '@nestjs/common';
import { RequestTripDto } from '../../dto/request-trip.dto';
import { TripService } from '../../trip.service';

@Injectable()
export class RequestTripHandler {
  constructor(private readonly tripService: TripService) {}

  async execute(dto: RequestTripDto) {
    return this.tripService.requestTrip(dto);
  }
}
