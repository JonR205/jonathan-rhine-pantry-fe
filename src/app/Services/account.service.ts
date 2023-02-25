import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Account } from '../Models/accounts';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Ingredient } from '../Models/ingredient';
import { Observable, Subject, take } from 'rxjs';
import { OnInit } from '@angular/core';
import { Recipe } from '../Models/recipe';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private _accountId: number | undefined;
  private username: string | undefined;
  public ingredients: Ingredient[] = [];
  public recipes: Recipe[] = [];
  private ingredientSubject: Subject<Ingredient[]> = new Subject();
  private recipesSubject: Subject<Recipe[]> = new Subject();
  private isLoggedIn = 'no';
  private showPantry = false;
  private showRegister = false;
  private showLogin = false;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
    this.getIngredientInfo();
    this.getRecipeInfo();
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');

    if (username && password) {
      this.tryLogin(username, password);
    }
  }

  public tryReg(newAccount: Account) {
    this.register(newAccount);
  }

  private showError(message: string): void {
    this.snackBar.open(message, undefined, { duration: 3000 });
  }

  public tryLogin(username: string, password: string) {
    // if (localStorage.getItem('uaername') != null) {
    //   return this.showError(
    //     'You are already logged in. Please log out to switch users.'
    //   );
    // }

    this.http
      .get<Account>(
        `http://localhost:8080/accounts?username=${username}&password=${password}`
      )
      .pipe(take(1))
      .subscribe({
        next: (account) => {
          this.loginSuccess(account);
        },
        error: () => {
          this.showError('Failed to login');
        },
      });
  }

  private loginSuccess(account: Account): void {
    this.accountId = account.id;
    console.log(account.id);
    this.username = account.username;
    localStorage.setItem('username', account.username);
    localStorage.setItem('password', account.password);
    localStorage.setItem('id', this.accountId!.toString());
    console.log(this.isLoggedIn);
    this.showError('Logged in as ' + this.username);
    this.getRecipeInfo();
    this.getIngredientInfo();
    this.startPantry();
  }

  public register(newAccount: Account): void {
    this.http
      .post(`http://localhost:8080/accounts`, newAccount)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.tryLogin(newAccount.username, newAccount.password);
        },
        error: () => {
          this.showError('Failed to register');
        },
      });
  }

  getRecipeInfo(): void {
    this.http
      .get<Recipe[]>('http://localhost:8080/recipes')
      .pipe(take(1))
      .subscribe({
        next: (recipes) => {
          this.recipes = recipes.filter(
            ({ accountId }) => this.accountId === accountId
          );
          this.recipesSubject.next(this.recipes);
        },
        error: (err) => {
          this.showError('Oops, Something went wrong Loading Recipes!');
        },
      });
  }

  getIngredientInfo(): void {
    this.http
      .get<Ingredient[]>('http://localhost:8080/ingredients')
      .pipe(take(1))
      .subscribe({
        next: (ingredients) => {
          this.ingredients = ingredients;
          this.ingredientSubject.next(this.ingredients);
        },
        error: (err) => {
          this.showError('Oops, Something went wrong Loading Ingredients!');
        },
      });
  }

  whenRecipesUpdated(): Observable<Recipe[]> {
    return this.recipesSubject.asObservable();
  }

  whenIngredientsUpdated(): Observable<Ingredient[]> {
    return this.ingredientSubject.asObservable();
  }

  refreshRecipeAndIngredientInfo(): void {
    this.getIngredientInfo();
    this.getRecipeInfo();
  }

  postrecipe(recipe: Recipe): void {
    const { id } = recipe;
    this.http
      .post<Recipe>('http://localhost:8080/recipes', recipe)
      .pipe(take(1))
      .subscribe(() => this.refreshRecipeAndIngredientInfo());
  }

  postIngredient(ingredient: Ingredient): void {
    const { id } = ingredient;
    this.http
      .post<Ingredient>('http://localhost:8080/ingredients', ingredient)
      .pipe(take(1))
      .subscribe(() => this.getIngredientInfo());
  }

  putRecipeInfo(recipe: Recipe): void {
    // this line decontruscting Accounts object
    const { id } = recipe;
    console.log(recipe);

    this.http
      .put<Recipe>(`http://localhost:8080/recipes/${id}`, recipe)
      .pipe(take(1))
      .subscribe(() => this.getRecipeInfo());
  }

  putIngredientInfo(ingredient: Ingredient): void {
    // this line decontruscting Accounts object
    const { id } = ingredient;
    console.log(ingredient);

    this.http
      .put<Ingredient>(`http://localhost:8080/ingredients/${id}`, ingredient)
      .pipe(take(1))
      .subscribe(() => this.getIngredientInfo());
  }

  deleteRecipeById(id: number): void {
    this.http
      .delete(`http://localhost:8080/recipes/${id}`)
      .pipe(take(1))
      .subscribe(() => this.getRecipeInfo());
  }

  deleteIngredientById(id: number): void {
    this.http
      .delete(`http://localhost:8080/ingredients/${id}`)
      .pipe(take(1))
      .subscribe({
        next: () => this.getIngredientInfo(),
        error: (err) => {
          this.showError('Oops, Check if Ingredient is Being Used By a Recipe');
        },
      });
  }

  public getShowRegister(): boolean {
    return this.showRegister;
  }
  public startRegister(): void {
    this.showLogin = false;
    this.showRegister = true;
  }

  public getShowLogin(): boolean {
    return this.showLogin;
  }
  public startLogin(): void {
    this.showLogin = true;
    this.showRegister = false;
    this.showPantry = false;
  }

  public getShowPantry(): boolean {
    return this.showPantry;
  }
  public startPantry(): void {
    this.showLogin = false;
    this.showRegister = false;
    this.showPantry = true;
  }

  public get accountId(): number | undefined {
    return this._accountId;
  }
  public set accountId(value: number | undefined) {
    this._accountId = value;
  }

  public logout(): void {
    this.showRegister = false;
    this.showLogin = true;
    this.showPantry = false;
    this.accountId = undefined;
    this.username = undefined;
    localStorage.clear();
    this.showError('Logout Successful');
    this.getShowLogin;
    this.refreshRecipeAndIngredientInfo();
  }
}
