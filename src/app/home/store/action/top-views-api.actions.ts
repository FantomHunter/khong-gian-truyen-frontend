import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/core/model/product.model';
import { TopViewsFilter } from 'src/app/core/model/top-views-filter.enum.model';

export const loadTopViewsApis = createAction(
  '[TopViewsApi] Load TopViewsApis',
  props<{ size: number , filterType: TopViewsFilter}>()
);

export const loadTopViewsApisSuccess = createAction(
  '[TopViewsApi] Load TopViewsApis Success',
  props<{ products: Product[] }>()
);

export const loadTopViewsApisFailure = createAction(
  '[TopViewsApi] Load TopViewsApis Failure',
  props<{ error: any }>()
);
