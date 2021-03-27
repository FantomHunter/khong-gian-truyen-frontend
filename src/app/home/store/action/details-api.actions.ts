import { createAction, props } from '@ngrx/store';
import { ProductDetail } from 'src/app/core/model/product-details.model';

export const loadDetailsApisSuccess = createAction(
  '[DetailsApi] Load DetailsApi Success',
  props<{ productDetail: ProductDetail }>()
);

export const loadDetailsApisFailure = createAction(
  '[DetailsApi] Load DetailsApi Failure',
  props<{ error: any }>()
);
