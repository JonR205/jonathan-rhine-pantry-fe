export class Account {
  constructor(
    public username: string,
    public password: string,
    public recipes:
      | [
          {
            name: string;
            steps: [];
            imageURL: string;
            ingredients: [];
          }
        ]
      | undefined,
    public id:  | undefined
  ) {}
}
