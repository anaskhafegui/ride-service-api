export class TripStatus {
  private static readonly allowed = [
    'pending_assignment',
    'accepted',
    'on_way',
    'arrived',
    'started',
    'ended',
  ] as const;

  private static transitions: Record<string, string> = {
    accepted: 'on_way',
    on_way: 'arrived',
    arrived: 'started',
    started: 'ended',
  };

  constructor(public readonly value: string) {
    if (!TripStatus.allowed.includes(value as any)) {
      throw new Error(`Invalid trip status: ${value}`);
    }
  }

  static pending(): TripStatus {
    return new TripStatus('pending_assignment');
  }

  static accepted(): TripStatus {
    return new TripStatus('accepted');
  }

  static onWay(): TripStatus {
    return new TripStatus('on_way');
  }

  static arrived(): TripStatus {
    return new TripStatus('arrived');
  }

  static started(): TripStatus {
    return new TripStatus('started');
  }

  static ended(): TripStatus {
    return new TripStatus('ended');
  }

  canTransitionTo(newStatus: TripStatus): boolean {
    return TripStatus.transitions[this.value] === newStatus.value;
  }

  equals(other: TripStatus): boolean {
    return this.value === other.value;
  }
}
