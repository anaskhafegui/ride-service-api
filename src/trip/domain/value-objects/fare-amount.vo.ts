export class FareAmount {
  constructor(public readonly value: number) {
    if (value < 0) {
      throw new Error('Fare cannot be negative');
    }
  }

  isGreaterThan(amount: FareAmount): boolean {
    return this.value > amount.value;
  }

  isLessThan(amount: FareAmount): boolean {
    return this.value < amount.value;
  }

  add(amount: FareAmount): FareAmount {
    return new FareAmount(this.value + amount.value);
  }

  subtract(amount: FareAmount): FareAmount {
    return new FareAmount(this.value - amount.value);
  }

  toString(): string {
    return `${this.value.toFixed(2)} SAR`;
  }
}
