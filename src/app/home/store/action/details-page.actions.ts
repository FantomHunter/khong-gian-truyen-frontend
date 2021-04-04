import { createAction, props } from '@ngrx/store';
import { Comment } from 'src/app/core/model/comment.model';

export const loadDetailsPages = createAction(
  '[DetailsPage] Load DetailsPages',
  props<{ id: number }>()
);

export const loadProductComments = createAction(
  '[DetailsPage] Load Product Comments',
  props<{ size: number; productId: number }>()
);

export const addNewComment = createAction(
  '[DetailsPage] Add New Comment',
  props<{ comment: string, prodId: number }>()
);
