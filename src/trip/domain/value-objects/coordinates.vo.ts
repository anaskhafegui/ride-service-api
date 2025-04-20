export class Coordinates {
  constructor(
    public readonly lat: number,
    public readonly lng: number,
  ) {
    if (!this.isValidLatitude(lat) || !this.isValidLongitude(lng)) {
      throw new Error('Invalid coordinates');
    }
  }

  private isValidLatitude(lat: number): boolean {
    return lat >= -90 && lat <= 90;
  }

  private isValidLongitude(lng: number): boolean {
    return lng >= -180 && lng <= 180;
  }

  equals(other: Coordinates): boolean {
    return this.lat === other.lat && this.lng === other.lng;
  }

  toString(): string {
    return `(${this.lat}, ${this.lng})`;
  }
}
