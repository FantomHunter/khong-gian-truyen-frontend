import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { ProductItemAction, TrendingPageActions } from '../action';

@Injectable()
export class RouteEffects {
  showProductDetails$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductItemAction.showProductDetails),
        tap(({ id }) => {
          console.log('show product details for id : ', id);
          this.router.navigate(['/' + id]);
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
  constructor(private actions$: Actions, private router: Router) {}
}
