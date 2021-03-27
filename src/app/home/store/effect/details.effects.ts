import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { ProductServiceApi } from 'src/app/core/service/product.service.api';
import { DetailsApiActions, DetailsPageActions } from '../action';

@Injectable()
export class DetailsEffects {
  loadProductDetail$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DetailsPageActions.loadDetailsPages),
      concatMap(({id}) =>
        this.productServiceApi.getProductDetail(id).pipe(
          map((productDetail) => DetailsApiActions.loadDetailsApisSuccess({ productDetail: productDetail })),
          catchError((error) =>
            of(DetailsApiActions.loadDetailsApisFailure({ error }))
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
