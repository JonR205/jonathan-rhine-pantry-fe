import { Component } from '@angular/core';
import { AccountService } from 'src/app/Services/account.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Account } from 'src/app/Models/accounts';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  accountInfoForm: FormGroup;

  public username = '';
  public password = '';
  public recipes = [];

  constructor(public as: AccountService) {
    this.accountInfoForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
    });
  }

  addAccount(): void {
    const newAccount = new Account(
      this.accountInfoForm.value.username,
      this.accountInfoForm.value.password,
      undefined,
      undefined
    );
    this.as.tryReg(newAccount);
  }
}
