import { v4 as uuidv4 } from 'uuid';
import { RequestTripDto } from '../use-cases/dto/request-trip.dto';
import { TripStatusEnum } from './enums/trip-status.enum';
import { CarType } from './value-objects/car-type.vo';
import { Coordinates } from './value-objects/coordinates.vo';
import { FareAmount } from './value-objects/fare-amount.vo';
import { PricingType } from './value-objects/pricing-type.vo';
import { ScheduledTime } from './value-objects/scheduled-time.vo';
import { ServiceType } from './value-objects/service-type.vo';
import { TripStatus } from './value-objects/trip-status.vo';

export class Trip {
  public readonly id: string;
  public readonly createdAt: Date;
  public updatedAt: Date;

  public status: TripStatus;

  public passengerId: string;
  public driverId?: string;

  public carType: CarType;
  public serviceType: ServiceType;
  public pricingType: PricingType;

  public pickupLocation: Coordinates;
  public dropoffLocation?: Coordinates;

  public estimatedFare?: FareAmount;
  public authorizedAmount?: FareAmount;
  public capturedAmount?: FareAmount;
  public scheduledTime?: ScheduledTime;

  public serviceAreaId?: string;

  constructor(dto: RequestTripDto) {
    this.id = uuidv4();
    this.createdAt = new Date();
    this.updatedAt = new Date();

    this.passengerId = dto.passengerId;
    this.carType = new CarType(dto.carType);
    this.serviceType = new ServiceType(dto.serviceType);
    this.pricingType = new PricingType(dto.pricingType);

    this.pickupLocation = new Coordinates(
      dto.pickupLocation.lat,
      dto.pickupLocation.lng,
    );
    if (dto.dropoffLocation) {
      this.dropoffLocation = new Coordinates(
        dto.dropoffLocation.lat,
        dto.dropoffLocation.lng,
      );
    }

    if (dto.scheduledTime) {
      this.scheduledTime = new ScheduledTime(new Date(dto.scheduledTime));
    }

    this.status = TripStatus.pending();
  }

  assignDriver(driverId: string) {
    if (!this.status.equals(TripStatus.pending())) {
      throw new Error(
        `Cannot assign driver in current status: ${this.status.value}`,
      );
    }
    this.driverId = driverId;
    this.status = TripStatus.accepted();
    this.updatedAt = new Date();
  }

  updateStatus(newStatus: TripStatusEnum) {
    this.status = new TripStatus(newStatus);
    this.updatedAt = new Date();
  }

  setEstimatedFare(amount: number) {
    this.estimatedFare = new FareAmount(amount);
    this.updatedAt = new Date();
  }

  authorizeFare(amount: number) {
    if (!this.estimatedFare)
      throw new Error('Cannot authorize without estimated fare');
    const max = this.estimatedFare.value * 1.5;
    if (amount > max) throw new Error('Authorization exceeds max limit');
    this.authorizedAmount = new FareAmount(amount);
    this.updatedAt = new Date();
  }

  captureFare(amount: number) {
    if (!this.authorizedAmount)
      throw new Error('Fare must be authorized first');
    this.capturedAmount = new FareAmount(amount);
    this.updatedAt = new Date();
  }

  hasOutstanding(): boolean {
    if (!this.estimatedFare) return false;
    if (!this.capturedAmount) return true;
    return this.estimatedFare.subtract(this.capturedAmount).value > 1;
  }

  isCaptureComplete(): boolean {
    return (
      this.capturedAmount &&
      this.capturedAmount.value >= (this.estimatedFare?.value ?? 0)
    );
  }

  markEnded() {
    if (!this.status.equals(TripStatus.started())) {
      throw new Error('Trip must be started before it can end');
    }
    this.status = TripStatus.ended();
    this.updatedAt = new Date();
  }
}
