export class DriverAcceptedTripEvent {
  constructor(
    public readonly tripId: string,
    public readonly driverId: string,
  ) {}
}
