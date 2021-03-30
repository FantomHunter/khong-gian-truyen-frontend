import { createAction, props } from '@ngrx/store';
import { Comment } from 'src/app/core/model/comment.model';
import { ProductDetail } from 'src/app/core/model/product-details.model';

export const loadDetailsApisSuccess = createAction(
  '[DetailsApi] Load DetailsApi Success',
  props<{ productDetail: ProductDetail }>()
);

export const loadDetailsApisFailure = createAction(
  '[DetailsApi] Load DetailsApi Failure',
  props<{ error: any }>()
);

export const loadProductCommentApisSuccess = createAction(
  '[ProductCommentApi] Load Product Comment Success',
  props<{ comments: Comment[] }>()
);

export const loadProductCommentApisFailure = createAction(
  '[ProductCommentApi] Load Product Comment Failure',
  props<{ error: any }>()
);
