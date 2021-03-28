import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { ProductServiceApi } from 'src/app/core/service/product.service.api';
import { NewCommentsActions } from '../action';

@Injectable()
export class NewCommentEffects {
  loadNewCommentProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(NewCommentsActions.loadNewComments),
      concatMap(({ size }) =>
        this.productServiceApi.getNewCommentProducts(size).pipe(
          map((products) =>
            NewCommentsActions.loadNewCommentsSuccess({ products })
          ),
          catchError((error) =>
            of(NewCommentsActions.loadNewCommentsFailure({ error }))
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
