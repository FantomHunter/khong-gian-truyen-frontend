import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Product } from 'src/app/core/model/product.model';
import { AllProductsApiActions, TrendingApiActions } from '../action';

export const trendingFeatureKey = 'trending-product';

export interface State extends EntityState<Product> {}

export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>({
  selectId: (product: Product) => product.id,
});

export const initialState: State = adapter.getInitialState({});

export const reducer = createReducer(
  initialState,
  on(TrendingApiActions.loadTrendingsSuccess, (state, { products }) =>
    adapter.setAll(products, state)
  ),
  on(TrendingApiActions.loadTrendingsFailure, (state, action) => initialState)
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
