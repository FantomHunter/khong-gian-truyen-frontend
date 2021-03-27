import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { ProductServiceApi } from 'src/app/core/service/product.service.api';
import {
  TrendingApiActions,
  TrendingPageActions,
  AllProductsApiActions,
} from '../action';

@Injectable()
export class TrendingEffects {
  loadTrendings$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TrendingPageActions.loadTrendingPages),
      concatMap(() =>
        this.productServiceApi.getLimitTrendingProduct(5).pipe(
          map((products) =>
            TrendingApiActions.loadTrendingsSuccess({ products })
          ),
          catchError((error) =>
            of(TrendingApiActions.loadTrendingsFailure({ error }))
          )
        )
      )
    );
  });

  loadAllTrendings$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AllProductsApiActions.loadAllProducts),
      concatMap(({ start, size, order }) =>
        this.productServiceApi.getAllProductWithPaging(start, size, order).pipe(
          map((productsPaging) =>
            AllProductsApiActions.loadAllProductsSuccess({ productsPaging })
          ),
          catchError((error) =>
            of(AllProductsApiActions.loadAllProductsFailure({ error }))
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
