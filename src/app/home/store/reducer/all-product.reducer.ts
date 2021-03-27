import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { Product } from 'src/app/core/model/product.model';
import { AllProductsApiActions } from '../action';

export const allProductFeatureKey = 'allProduct';

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
  on(
    AllProductsApiActions.loadAllProductsSuccess,
    (state, { productsPaging }) =>
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
