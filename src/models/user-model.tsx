export class UserModel {
  constructor(
    public id: string,
    public name: string,
    public email: number,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
}
