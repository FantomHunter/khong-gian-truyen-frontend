import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import { TrendingApiActions, TrendingPageActions } from '../action';
import { ProductServiceApi } from 'src/app/core/service/product.service.api';

@Injectable()
export class TrendingEffects {
  loadTrendings$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TrendingPageActions.loadTrendingPages),
      concatMap(() =>
        this.productServiceApi.getLimitTrendingProduct(5).pipe(
          map((products) => TrendingApiActions.loadTrendingsSuccess({ products })),
          catchError((error) =>
            of(TrendingApiActions.loadTrendingsFailure({ error }))
          )
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private productServiceApi: ProductServiceApi
  ) {}
}
