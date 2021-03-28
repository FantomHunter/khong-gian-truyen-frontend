import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { ProductServiceApi } from 'src/app/core/service/product.service.api';
import { TopViewsApiActions } from '../action';

@Injectable()
export class TopViewsEffects {
  loadTopViews$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TopViewsApiActions.loadTopViewsApis),
      concatMap(({ size, filterType }) =>
        this.productServiceApi.getTopViewsProduct(size, filterType).pipe(
          map((products) =>
            TopViewsApiActions.loadTopViewsApisSuccess({ products })
          ),
          catchError((error) =>
            of(TopViewsApiActions.loadTopViewsApisFailure({ error }))
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
