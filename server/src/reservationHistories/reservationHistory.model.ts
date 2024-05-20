export class ReservationHistory {
  constructor(
    public id: number,
    public username: string,
    public concertName: string,
    public timestamp: Date,
    public action: 'Reserve' | 'Cancel',
  ) {}
}
