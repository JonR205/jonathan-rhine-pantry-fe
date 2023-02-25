import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/Models/ingredient';
import { Recipe } from 'src/app/Models/recipe';
import { AccountService } from 'src/app/Services/account.service';

@Component({
  selector: 'app-recipies',
  templateUrl: './recipies.component.html',
  styleUrls: ['./recipies.component.css'],
})
export class RecipiesComponent {
  recipeInfoForm: FormGroup;
  ingredientInfoForm: FormGroup;
  public addARecipe = false;
  public ingredients: Ingredient[] = [];

  public recipes: Recipe[];
  private recipesSubject: Subscription;
  constructor(private as: AccountService) {
    this.recipes = as.recipes;

    const recipesUpdatedEvent = as.whenRecipesUpdated();
    this.recipesSubject = recipesUpdatedEvent.subscribe(
      (recipes) => (this.recipes = recipes)
    );
    this.recipeInfoForm = new FormGroup({
      name: new FormControl(),
      imageURL: new FormControl(),
      steps: new FormControl(),
      calories: new FormControl(),
    });
    this.ingredientInfoForm = new FormGroup({
      imageURL: new FormControl(),
      name: new FormControl(),
      weight: new FormControl(),
    });
  }

  addRecipe(): void {
    if (this.as.accountId) {
      const steps = this.recipeInfoForm.value.steps.split(',');
      const newRecipe = new Recipe(
        this.recipeInfoForm.value.name,
        steps,
        this.recipeInfoForm.value.imageURL,
        this.recipeInfoForm.value.calories,
        this.as.accountId,
        this.ingredients,
        undefined
      );

      this.as.postrecipe(newRecipe);
      this.addARecipe = false;
    }
  }

  addIngredient = (ingredient: Ingredient) => {
    this.ingredients.push(ingredient);
  };

  ngOnInit(): void {}
}
