import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/Models/ingredient';
import { AccountService } from 'src/app/Services/account.service';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css'],
})
export class IngredientsComponent {
  ingredientInfoForm: FormGroup;
  public addAnIngredient = false;

  public ingredients: Ingredient[];
  private acountsSubject: Subscription;
  constructor(private ac: AccountService) {
    this.ingredients = ac.ingredients;
    console.log(this.ingredients);

    const ingredientsUpdatedEvent = ac.whenIngredientsUpdated();
    this.acountsSubject = ingredientsUpdatedEvent.subscribe(
      (ingredients) => (this.ingredients = ingredients)
    );
    this.ingredientInfoForm = new FormGroup({
      name: new FormControl(),
      imageURL: new FormControl(),
      weight: new FormControl(),
    });
  }

  addIngredient(): void {
    console.log(this.ingredientInfoForm.value);
    const newIngredient = new Ingredient(
      this.ingredientInfoForm.value.name,
      this.ingredientInfoForm.value.imageURL,
      this.ingredientInfoForm.value.weight,
      undefined
    );
    this.ac.postIngredient(newIngredient);
    this.addAnIngredient = false;
  }

  ngOnInit(): void {}
}
