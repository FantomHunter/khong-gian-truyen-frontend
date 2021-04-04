import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, concatMap, map, withLatestFrom } from 'rxjs/operators';
import { ProductServiceApi } from 'src/app/core/service/product.service.api';
import { DetailsApiActions, DetailsPageActions } from '../action';
import { DetailProductSelector } from '../selector';

@Injectable()
export class DetailsEffects {
  loadProductDetail$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DetailsPageActions.loadDetailsPages),
      concatMap(({ id }) =>
        this.productServiceApi.getProductDetail(id).pipe(
          map((productDetail) =>
            DetailsApiActions.loadDetailsApisSuccess({
              productDetail: productDetail,
            })
          ),
          catchError((error) =>
            of(DetailsApiActions.loadDetailsApisFailure({ error }))
          )
        )
      )
    );
  });

  loadProductComments$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DetailsPageActions.loadProductComments),
      concatMap(({ size, productId }) =>
        this.productServiceApi.getProductComments(size, productId).pipe(
          map((comments) =>
            DetailsApiActions.loadProductCommentApisSuccess({ comments })
          ),
          catchError((error) =>
            of(DetailsApiActions.loadProductCommentApisFailure({ error }))
          )
        )
      )
    );
  });

  addNewProductComments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DetailsPageActions.addNewComment),
      concatMap(({ comment, prodId }) =>
        this.productServiceApi.addCommentToProduct(comment, prodId).pipe(
          map((comment) => DetailsApiActions.addCommentApisSuccess()),
          catchError((error) =>
            of(DetailsApiActions.addCommentApisFailure({ error }))
          )
        )
      )
    )
  );

  reloadProductComments$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DetailsApiActions.addCommentApisSuccess),
      withLatestFrom(
        this.store.pipe(select(DetailProductSelector.selectCommentsProduct))
      ),
      withLatestFrom(
        this.store.pipe(select(DetailProductSelector.selectDetailsProduct))
      ),
      concatMap(([[{}, comments], productDetail]) =>
        this.productServiceApi
          .getProductComments(comments.length, productDetail.id)
          .pipe(
            map((comments) =>
              DetailsApiActions.loadProductCommentApisSuccess({ comments })
            ),
            catchError((error) =>
              of(DetailsApiActions.loadProductCommentApisFailure({ error }))
            )
          )
      )
    );
  });
  constructor(
    private actions$: Actions,
    private productServiceApi: ProductServiceApi,
    private store: Store
  ) {}
}
