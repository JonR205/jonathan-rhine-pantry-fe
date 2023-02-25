import { Ingredient } from './ingredient';

export class Recipe {
  constructor(
    public name: string,
    public steps: string[],
    public imageURL: string,
    public calories: number,
    public accountId: number,
    public ingredients: Ingredient[] | undefined,
    public id: number | undefined
  ) {}
}
