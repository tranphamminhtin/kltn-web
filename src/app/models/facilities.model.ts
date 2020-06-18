export class Facilities {
  constructor(
    public _id: string,
    public name: string,
    public type: string,
    public supplier: string,
    public date: Date,
    public image: string,
    public note: string,
    public quantity: Number = 1
  ){}
}
