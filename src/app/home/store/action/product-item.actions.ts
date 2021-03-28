import { createAction, props } from '@ngrx/store';

export const showProductDetails = createAction(
  '[ProductItem] Show Product Details',
  props<{ id: number }>()
);
