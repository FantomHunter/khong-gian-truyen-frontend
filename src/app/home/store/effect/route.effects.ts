import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { tap, withLatestFrom } from 'rxjs/operators';
import { LoginApiActions, LoginPageActions, NavbarActions } from 'src/app/auth/store/action';
import { AuthenticationStatusSelector } from 'src/app/auth/store/selector';
import { AppState } from 'src/app/reducers';
import { environment } from 'src/environments/environment';
import { ProductItemAction, TrendingPageActions } from '../action';

@Injectable()
export class RouteEffects {
  showProductDetails$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductItemAction.showProductDetails),
        tap(({ id }) => {
          console.log('show product details for id : ', id);
          this.router.navigate(['/product/' + id]);
        })
      ),
    { dispatch: false }
  );

  showAllProduct$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TrendingPageActions.showAllTrending),
        tap(() => {
          this.router.navigate(['/all']);
        })
      ),
    { dispatch: false }
  );

  showLoginPage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LoginPageActions.loadLoginPages),
        tap(({ redirectUrl }) => {
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );

  backToPreviousePage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LoginApiActions.loadLoginApiSuccess),
        withLatestFrom(
          this.store.pipe(
            select(AuthenticationStatusSelector.selectRedirectUrl)
          )
        ),
        tap(([{ user }, redirectUrl]) => {
          if (!environment.debug) {
            console.log('user: ', user, '| redirectUrl: ', redirectUrl);
            this.router.navigateByUrl(redirectUrl);
          }
        })
      ),
    { dispatch: false }
  );

  redirectAfterLogout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(NavbarActions.logout),
        tap(() => {
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location,
    private store: Store<AppState>
  ) {}
}
