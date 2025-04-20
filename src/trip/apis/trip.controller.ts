import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { RequestTripDto } from '../../service-area/application/dto/request-trip.dto';
import { FareAmountDto } from '../application/dto/fare-amount.dto';
import { TripService } from '../domain-service/trip.service';
import { TripStatusEnum } from '../domain/enums/trip-status.enum';

@Controller('trips')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Post()
  requestTrip(@Body() dto: RequestTripDto) {
    return this.tripService.requestTrip(dto);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: TripStatusEnum,
  ) {
    return this.tripService.updateTripStatus(id, status);
  }

  @Patch(':id/authorize')
  authorizeFare(@Param('id') id: string, @Body() body: FareAmountDto) {
    return this.tripService.authorizeFare(id, body.amount);
  }

  @Patch(':id/capture')
  captureFare(@Param('id') id: string, @Body() body: FareAmountDto) {
    return this.tripService.captureFare(id, body.amount);
  }
}
