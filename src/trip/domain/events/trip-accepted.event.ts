export class TripAcceptedEvent {
  constructor(
    public readonly tripId: string,
    public readonly driverId: string,
  ) {}
}
