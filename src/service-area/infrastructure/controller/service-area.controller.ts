import { Controller, Get, Query } from '@nestjs/common';
import { ServiceAreaService } from '../../application/queries/service-area.service';
import { FindServiceAreaByCoordinatesDto } from '../../application/dto/find-service-area-by-coordinates.dto';

@Controller('service-areas')
export class ServiceAreaController {
  constructor(private readonly serviceAreaService: ServiceAreaService) {}

  @Get('lookup')
  findByCoordinates(@Query() query: FindServiceAreaByCoordinatesDto) {
    return this.serviceAreaService.findByCoordinates(query.lat, query.lng);
  }
}
