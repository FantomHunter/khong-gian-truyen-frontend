import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { LoginPageActions } from '../store/action';
import { Credential } from 'src/app/core/model/user.model';
import { Observable } from 'rxjs';
import { AuthenticationStatusSelector } from '../store/selector';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = this.formBuilder.group({
    username: [''],
    password: [''],
  });

  isLoggedIn$: Observable<boolean>;

  constructor(private formBuilder: FormBuilder, private store: Store) {
    this.isLoggedIn$ = this.store.pipe(
      select(AuthenticationStatusSelector.selectIsLoggedIn)
    );
  }

  ngOnInit(): void {}

  onLogin() {
    console.log('login form value: ', this.loginForm.value);
    this.store.dispatch(
      LoginPageActions.performLogin({ credential: this.loginForm.value })
    );
  }
}
