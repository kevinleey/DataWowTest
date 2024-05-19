export class ReservationHistory {
  constructor(
    public id: string,
    public username: string,
    public concertName: string,
    public timestamp: Date,
    public action: 'Reserve' | 'Cancel',
  ) {}
}
