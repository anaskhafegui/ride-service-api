export class CarType {
  private static allowed = ['economy', 'comfort', 'luxury'];

  constructor(public readonly value: string) {
    if (!CarType.allowed.includes(value)) {
      throw new Error(`Invalid car type: ${value}`);
    }
  }

  equals(other: CarType): boolean {
    return this.value === other.value;
  }
}
