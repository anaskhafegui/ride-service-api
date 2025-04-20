import { Type } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

export class LatLngDto {
  @IsNumber()
  @Min(-90)
  @Max(90)
  lat: number;

  @IsNumber()
  @Min(-180)
  @Max(180)
  lng: number;
}

export class RequestTripDto {
  passengerId: string;
  carType: string;
  serviceType: string;
  pricingType: string;

  @ValidateNested()
  @Type(() => LatLngDto)
  pickupLocation: LatLngDto;

  @ValidateNested()
  @Type(() => LatLngDto)
  dropoffLocation?: LatLngDto;

  @IsOptional()
  @Type(() => Date)
  scheduledTime?: Date;
}
