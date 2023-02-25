import { Component } from '@angular/core';
import { AccountService } from 'src/app/Services/account.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Account } from 'src/app/Models/accounts';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  accountInfoForm: FormGroup;

  public username = '';
  public password = '';

  constructor(public as: AccountService) {
    this.accountInfoForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
    });
  }

  loginInfo(): void {
    console.log(this.accountInfoForm.value);
    const loginVar = new Account(
      this.accountInfoForm.value.username,
      this.accountInfoForm.value.password,
      undefined,
      undefined
    );
    this.as.tryLogin(loginVar.username, loginVar.password);
  }
}
