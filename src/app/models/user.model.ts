export enum Right {
  Admin,
  Manager,
  User
}
export enum Gender {
  Female,
  Male
}
export class User {
  constructor(
    public _id: string,
    public email: string,
    // public password: String,
    public right: Right = Right.User,
    public name: string,
    public unit: string,
    public gender: Gender = Gender.Female,
    public address: string,
    public numberphone: string,
  ) { }
}
