import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/Services/account.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(public as: AccountService) {}

  public setstartRegister(): void {
    this.as.startRegister();
  }

  public setstartLogin(): void {
    this.as.startLogin();

  }

  public getShowLogin() {
    return this.as.getShowLogin()
  }

  public setstartPantry(): void {
    this.as.startPantry();
  }

  public setLogout(): void {
    this.as.logout();
  }

  ngOnInit(): void {}
}
