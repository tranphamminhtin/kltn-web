export class Vote {
  constructor(
    public _id: string,
    public email: string,
    public loanFacilities: string,
    public percent: Number = 100,
    public note: string,
  ) { }
}
