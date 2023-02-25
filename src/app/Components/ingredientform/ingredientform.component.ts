import { Component, Input, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/Models/ingredient';
import { FormControl, FormGroup } from '@angular/forms';
import { AccountService } from 'src/app/Services/account.service';

@Component({
  selector: 'app-ingredientform',
  templateUrl: './ingredientform.component.html',
  styleUrls: ['./ingredientform.component.css'],
})
export class IngredientformComponent {
  @Input() ingredient: Ingredient | null = null;
  @Input() onSubmit: (ingredient: Ingredient) => void = () => {};
  ingredientInfoForm: FormGroup;

  constructor(private ac: AccountService) {
    this.ingredientInfoForm = new FormGroup({
      name: new FormControl(),
      imageURL: new FormControl(),
      weight: new FormControl(),
    });
  }

  onDelete(): void {
    if (this.ingredient === null) {
      console.log('no Ingredient!');
    } else {
      if (this.ingredient.id) this.ac.deleteIngredientById(this.ingredient.id);
    }
  }

  setToEditMode(): void {
    this.ingredientInfoForm.patchValue({
      name: this.ingredient?.name,
      imageURL: this.ingredient?.imageURL,
      weight: this.ingredient?.weight,
    });
  }
  ngOnInit(): void {
    if (this.ingredient) {
      this.ingredientInfoForm.patchValue({
        name: this.ingredient?.name,
        imageURL: this.ingredient?.imageURL,
        weight: this.ingredient?.weight,
      });
    }
  }

  callOnSubmit(): void {
    const newIngredient = new Ingredient(
      this.ingredientInfoForm.value.name,
      this.ingredientInfoForm.value.imageURL,
      this.ingredientInfoForm.value.weight,
      undefined
    );
    this.onSubmit(newIngredient);
  }
}
