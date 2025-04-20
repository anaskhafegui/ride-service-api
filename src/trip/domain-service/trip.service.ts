import { Injectable, NotFoundException } from '@nestjs/common';
import { TripStatusEnum } from './domain/enums/trip-status.enum';
import { Trip } from './domain/trip.aggregate';
import { TripStatus } from './domain/value-objects/trip-status.vo';
import { RequestTripDto } from './use-cases/dto/request-trip.dto';

@Injectable()
export class TripService {
  private readonly trips = new Map<string, Trip>();

  async requestTrip(dto: RequestTripDto): Promise<Trip> {
    const trip = new Trip(dto);
    this.trips.set(trip.id, trip);
    // Simulate emitting TripRequestedEvent here
    return trip;
  }

  async updateTripStatus(
    tripId: string,
    newStatus: TripStatusEnum,
  ): Promise<void> {
    const trip = this.trips.get(tripId);
    if (!trip) throw new NotFoundException('Trip not found');

    trip.updateStatus(newStatus);

    // Simulate event and notification here
    if (newStatus === TripStatusEnum.ENDED) {
      this.handleTripEnded(trip);
    }
  }

  async assignDriver(tripId: string, driverId: string): Promise<void> {
    const trip = this.trips.get(tripId);
    if (!trip) throw new NotFoundException('Trip not found');

    trip.assignDriver(driverId);
    // Simulate emitting TripAcceptedEvent
  }

  async estimateFare(tripId: string, estimatedFare: number): Promise<void> {
    const trip = this.trips.get(tripId);
    if (!trip) throw new NotFoundException('Trip not found');

    trip.setEstimatedFare(estimatedFare);
    // Simulate emitting FareEstimatedEvent
  }

  async authorizeFare(tripId: string, amount: number): Promise<void> {
    const trip = this.trips.get(tripId);
    if (!trip) throw new NotFoundException('Trip not found');

    trip.authorizeFare(amount);
    // Simulate payment gateway integration and FareAuthorizedEvent
  }

  async captureFare(tripId: string, amount: number): Promise<void> {
    const trip = this.trips.get(tripId);
    if (!trip) throw new NotFoundException('Trip not found');

    trip.captureFare(amount);

    if (trip.hasOutstanding()) {
      // Simulate CreateOutstandingEvent
    }
    // Simulate CaptureSuccessEvent
  }

  private handleTripEnded(trip: Trip): void {
    if (trip.status !== TripStatus.ended()) return;
    // Emit TripEndedEvent
  }

  async getTripById(tripId: string): Promise<Trip | undefined> {
    return this.trips.get(tripId);
  }

  async getTripsByPassenger(passengerId: string): Promise<Trip[]> {
    return Array.from(this.trips.values()).filter(
      (t) => t.passengerId === passengerId,
    );
  }
}
