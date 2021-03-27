import { createAction, props } from '@ngrx/store';
import { ProductPaging } from 'src/app/core/model/product-paging.model';
import { Product } from 'src/app/core/model/product.model';

export const loadTrendingsSuccess = createAction(
  '[Trending/API] Load Trendings Success',
  props<{ products: Product[] }>()
);

export const loadTrendingsFailure = createAction(
  '[Trending/API] Load Trendings Failure',
  props<{ error: any }>()
);

export const loadAllTrending = createAction(
  '[Trending/API] Load All Trendings',
  props<{ start: number; size: number; order: string }>()
);

export const loadAllTrendingsSuccess = createAction(
  '[Trending/API] Load All Trendings Success',
  props<{ productsPaging: ProductPaging }>()
);

export const loadAllTrendingsFailure = createAction(
  '[Trending/API] Load All Trendings Failure',
  props<{ error: any }>()
);
