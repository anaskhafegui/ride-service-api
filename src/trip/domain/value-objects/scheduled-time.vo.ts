export class ScheduledTime {
  constructor(public readonly value: Date) {
    if (value.getTime() < Date.now()) {
      throw new Error('Scheduled time cannot be in the past');
    }
  }

  isInFuture(): boolean {
    return this.value.getTime() > Date.now();
  }
}
