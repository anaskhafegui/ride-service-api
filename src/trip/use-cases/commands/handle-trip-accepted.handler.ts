import { TripAcceptedEvent } from '../../domain/events/trip-accepted.event';
import { TripStatus } from '../../domain/value-objects/trip-status.vo';

@EventsHandler(TripAcceptedEvent)
export class HandleTripAcceptedHandler
  implements IEventHandler<TripAcceptedEvent>
{
  constructor(
    private readonly tripRepo: TripRepository,
    private readonly pricingService: PricingService,
    private readonly paymentService: PaymentService,
  ) {}

  async handle(event: TripAcceptedEvent): Promise<void> {
    const trip = await this.tripRepo.findById(event.tripId);
    if (!trip || !trip.status.equals(TripStatus.accepted())) return;

    // 1. Estimate Fare
    const estimatedFare = await this.pricingService.estimateFare({
      pickup: trip.pickupLocation,
      dropoff: trip.dropoffLocation!,
      carType: trip.carType,
      pricingType: trip.pricingType,
    });

    // 2. Set fare on aggregate
    trip.setEstimatedFare(estimatedFare);

    // 3. Authorize fare
    const authorizedAmount = await this.paymentService.authorize({
      tripId: trip.id,
      passengerId: trip.passengerId,
      amount: estimatedFare,
    });

    trip.authorizeFare(authorizedAmount);

    await this.tripRepo.save(trip);

    // Optionally: emit FareAuthorizedEvent
  }
}
