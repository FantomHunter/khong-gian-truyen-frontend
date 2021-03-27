import { createAction, props } from '@ngrx/store';
import { ProductPaging } from 'src/app/core/model/product-paging.model';

export const loadAllProducts = createAction(
  '[AllProduct/API] Load All Trendings',
  props<{ start: number; size: number; order: string }>()
);

export const loadAllProductsSuccess = createAction(
  '[AllProduct/API] Load All Trendings Success',
  props<{ productsPaging: ProductPaging }>()
);

export const loadAllProductsFailure = createAction(
  '[AllProduct/API] Load All Trendings Failure',
  props<{ error: any }>()
);
