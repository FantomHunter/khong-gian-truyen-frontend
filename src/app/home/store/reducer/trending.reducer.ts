import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Product } from 'src/app/core/model/product.model';
import { TrendingApiActions } from '../action';

export const trendingFeatureKey = 'trending-product';

export interface State extends EntityState<Product> {
  size: number;
  start: number;
  total: number;
  order: string;
  page: number;
}

export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>({
  selectId: (product: Product) => product.id,
});

export const initialState: State = adapter.getInitialState({
  size: 5,
  start: 0,
  total: 50,
  page: 1,
  order: 'id',
});

export const reducer = createReducer(
  initialState,
  on(TrendingApiActions.loadTrendingsSuccess, (state, { products }) =>
    adapter.setAll(products, state)
  ),
  on(TrendingApiActions.loadTrendingsFailure, (state, action) => initialState),

  on(TrendingApiActions.loadAllTrendingsSuccess, (state, { productsPaging }) =>
    adapter.setAll(productsPaging.currentList, {
      ...state,
      size: productsPaging.size,
      start: productsPaging.start,
      total: productsPaging.total,
    })
  )
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
