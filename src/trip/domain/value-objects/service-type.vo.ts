export class ServiceType {
  private static allowed = ['instant', 'scheduled'];

  constructor(public readonly value: string) {
    if (!ServiceType.allowed.includes(value)) {
      throw new Error(`Invalid service type: ${value}`);
    }
  }

  isScheduled(): boolean {
    return this.value === 'scheduled';
  }

  equals(other: ServiceType): boolean {
    return this.value === other.value;
  }
}
