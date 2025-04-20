export class PricingType {
  private static allowed = ['metered', 'hourly', 'point-to-point'];

  constructor(public readonly value: string) {
    if (!PricingType.allowed.includes(value)) {
      throw new Error(`Invalid pricing type: ${value}`);
    }
  }

  equals(other: PricingType): boolean {
    return this.value === other.value;
  }
}
