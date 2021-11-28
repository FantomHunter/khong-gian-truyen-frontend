import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Credential, User } from '../../model/user.model';
import { AuthenticationServiceApi } from '../auth.service.api';
import { LoginService } from './login/login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationServiceJhipster extends AuthenticationServiceApi {
  constructor(private loginService: LoginService) {
    super();
  }
  login(credential: Credential): Observable<User> {
    return this.loginService
      .login({
        username: credential.username,
        password: credential.password,
        rememberMe: true,
      })
      .pipe(
        map((account) => {
          return {
            id: 'real-user',
            name: account?.firstName? account.firstName: 'User',
            token: 'alskdfjlwiuoejflskjd',
            refreshToken: 'refresh token',
          };
        })
      );
  }
}
