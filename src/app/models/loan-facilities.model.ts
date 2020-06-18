export enum State {
  Not,
  Revoked
}

export class LoanFacilities {
  constructor(
    public _id: string,
    public facilities: string,
    public room: string,
    public unit: string,
    public manager: string,
    public note: string,
    public from: Date = new Date(Date.now()),
    public to: Date,
    public state: State = State.Not,
    public request: Boolean = false,
  ) {}
}
