export class LoanFacilitiesViewModel {
  constructor(
    public _id: string,
    public facilities: string,
    public name: string,
    public room: string,
    public nameRoom: string,
    public unit: string,
    public nameUnit: string,
    public manager: string,
    public nameUser: string,
    public note: string,
    public from: Date = new Date(Date.now()),
    public to: Date,
    public state: Number,
    public percent: Number,
    public comment: string,
    public request: Boolean = false,
  ) {}
}
