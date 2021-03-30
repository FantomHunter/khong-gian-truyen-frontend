import { createAction, props } from '@ngrx/store';

export const loadDetailsPages = createAction(
  '[DetailsPage] Load DetailsPages',
  props<{ id: number }>()
);

export const loadProductComments= createAction(
  '[DetailsPage] Load Product Comments',
  props<{ size: number, productId: number }>()
);