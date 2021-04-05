import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NavbarActions } from './auth/store/action';
import { AuthenticationStatusSelector } from './auth/store/selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'khong-gian-truyen-frontend';
  isUserLoggedIn$: Observable<boolean>;
  constructor(private store: Store) {
    this.isUserLoggedIn$ = this.store.pipe(
      select(AuthenticationStatusSelector.selectIsLoggedIn)
    );
  }

  onLogout() {
    this.store.dispatch(NavbarActions.logout());
  }
}
