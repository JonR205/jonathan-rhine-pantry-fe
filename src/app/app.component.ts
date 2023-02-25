import { Component } from '@angular/core';
import { AccountService } from './Services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(public as: AccountService) {}

  public getGetShowRegister(): boolean {
    return this.as.getShowRegister()
  }

  public getGetShowLogin(): boolean {
    return this.as.getShowLogin()
  }

  public getGetShowPantry(): boolean {
    return this.as.getShowPantry()
  }
}
