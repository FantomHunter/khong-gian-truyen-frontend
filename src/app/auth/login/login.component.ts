import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = this.formBuilder.group({
    username: [''],
    password: [''],
  });

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  onLogin() {
    console.log('login form value: ', this.loginForm.value);
  }
}
