import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from 'src/app/Models/recipe';
import { FormControl, FormGroup } from '@angular/forms';
import { AccountService } from 'src/app/Services/account.service';
import { Ingredient } from 'src/app/Models/ingredient';

@Component({
  selector: 'app-recipie',
  templateUrl: './recipie.component.html',
  styleUrls: ['./recipie.component.css'],
})
export class RecipieComponent {
  @Input() recipe: Recipe | null = null;
  recipeInfoForm: FormGroup;
  public editRecipe = false;
  public addRecipe = false;

  constructor(private ac: AccountService) {
    this.recipeInfoForm = new FormGroup({
      name: new FormControl(),
      imageURL: new FormControl(),
      calories: new FormControl(),
      steps: new FormControl(),
    });
  }

  updateRecipe(): void {
    const steps = this.recipeInfoForm.value.steps.split(',');

    const newRecipe: Recipe = {
      ...this.recipe,
      ...this.recipeInfoForm.value,
      steps,
    };
    this.ac.putRecipeInfo(newRecipe);
    this.editRecipe = true;
  }

  onDelete(): void {
    if (this.recipe === null) {
      console.log('no Recipe!');
    } else {
      if (this.recipe.id) this.ac.deleteRecipeById(this.recipe.id);
    }
  }

  setToEditMode(): void {
    this.editRecipe = true;
    this.recipeInfoForm.patchValue({
      name: this.recipe?.name,
      steps: this.recipe?.steps.toString(),
      imageURL: this.recipe?.imageURL,
      calories: this.recipe?.calories,
    });
  }
  // had to make an arrow function so that this would be bound to recipe class
  addIngredient = (ingredient: Ingredient) => {
    this.recipe?.ingredients?.push(ingredient);
  };

  ngonInit(): void {}
}
