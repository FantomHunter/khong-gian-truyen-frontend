import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LoginPageActions, NavbarActions } from './auth/store/action';
import { AuthenticationStatusSelector } from './auth/store/selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'khong-gian-truyen-frontend';
  isUserLoggedIn$: Observable<boolean>;
  constructor(private store: Store, private router: Router) {
    this.isUserLoggedIn$ = this.store.pipe(
      select(AuthenticationStatusSelector.selectIsLoggedIn)
    );
  }

  onLogout() {
    this.store.dispatch(NavbarActions.logout());
  }

  onLogin() {
    this.store.dispatch(
      LoginPageActions.loadLoginPages({ redirectUrl: this.router.url })
    );
  }

  reloadPage() {
    location.replace(document.getElementsByTagName('base')[0].href);
  }
}
