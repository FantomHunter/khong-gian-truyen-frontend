import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { Product } from 'src/app/core/model/product.model';
import { TrendingApiActions, TrendingPageActions } from '../action';

export const trendingFeatureKey = 'trending-product';

export interface State extends EntityState<Product> {
  selectedProductId: number | null;
}

export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>({
  selectId: (product: Product) => product.id,
});

export const initialState: State = adapter.getInitialState({
  selectedProductId: null,
});

export const reducer = createReducer(
  initialState,
  on(TrendingApiActions.loadTrendingsSuccess, (state, { products }) =>
    adapter.addMany(products, state)
  ),
  on(TrendingApiActions.loadTrendingsFailure, (state, action) => state)
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
