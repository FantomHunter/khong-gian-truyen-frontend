import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/core/model/product.model';

export const loadNewComments = createAction(
  '[NewComment] Load NewComments',
  props<{ size: number }>()
);

export const loadNewCommentsSuccess = createAction(
  '[NewComment] Load NewComments Success',
  props<{ products: Product[] }>()
);

export const loadNewCommentsFailure = createAction(
  '[NewComment] Load NewComments Failure',
  props<{ error: any }>()
);
