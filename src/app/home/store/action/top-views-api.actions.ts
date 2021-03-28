import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/core/model/product.model';

export const loadTopViewsApis = createAction(
  '[TopViewsApi] Load TopViewsApis',
  props<{ size: number }>()
);

export const loadTopViewsApisSuccess = createAction(
  '[TopViewsApi] Load TopViewsApis Success',
  props<{ products: Product[] }>()
);

export const loadTopViewsApisFailure = createAction(
  '[TopViewsApi] Load TopViewsApis Failure',
  props<{ error: any }>()
);
