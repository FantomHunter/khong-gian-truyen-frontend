import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { LoginApiActions, LoginPageActions } from 'src/app/auth/store/action';
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
        tap(() => {
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );

  backToPreviousePage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LoginApiActions.loadLoginApiSuccess),
        tap(() => {
          if (!environment.production) {
            // this.router.navigate(['/all']);
            const currentNavigation = this.router.getCurrentNavigation();
            console.log(
              'previous navigation',
              currentNavigation?.previousNavigation
            );
            this.location.back();
          }
        })
      ),
    { dispatch: false }
  );
  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location
  ) {}
}
