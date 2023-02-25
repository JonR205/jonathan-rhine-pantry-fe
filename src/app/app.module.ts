import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { RegisterComponent } from './Components/register/register.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoginComponent } from './Components/login/login.component';
import { IngredientsComponent } from './Components/ingredients/ingredients.component';
import { IngredientComponent } from './Components/ingredient/ingredient.component';
import { RecipiesComponent } from './Components/recipies/recipies.component';
import { RecipieComponent } from './Components/recipie/recipie.component';
import { IngredientformComponent } from './Components/ingredientform/ingredientform.component';
import { HeaderComponent } from './Components/header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    IngredientsComponent,
    IngredientComponent,
    RecipiesComponent,
    RecipieComponent,
    IngredientformComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatSnackBarModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatCardModule,
    MatTabsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
