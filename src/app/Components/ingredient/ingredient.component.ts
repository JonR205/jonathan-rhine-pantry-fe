import { Component, Input, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/Models/ingredient';
import { FormControl, FormGroup } from '@angular/forms';
import { AccountService } from 'src/app/Services/account.service';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.css'],
})
export class IngredientComponent {
  @Input() ingredient: Ingredient | null = null;
  ingredientInfoForm: FormGroup;
  public editIngredient = false;
  public addIngredient = false;

  constructor(private ac: AccountService) {
    this.ingredientInfoForm = new FormGroup({
      name: new FormControl(),
      imageURL: new FormControl(),
      weight: new FormControl(),
    });
  }

  updateIngredient(): void {
    const newIngredient = {
      ...this.ingredient,
      ...this.ingredientInfoForm.value,
    };
    this.ac.putIngredientInfo(newIngredient);
    this.editIngredient = true;
  }

  onDelete(): void {
    if (this.ingredient === null) {
      console.log('no Ingredient!');
    } else {
      if (this.ingredient.id) this.ac.deleteIngredientById(this.ingredient.id);
    }
  }

  setToEditMode(): void {
    this.editIngredient = true;
    this.ingredientInfoForm.patchValue({
      name: this.ingredient?.name,
      imageURL: this.ingredient?.imageURL,
      weight: this.ingredient?.weight,
    });
  }

  ngonInit(): void {}
}
