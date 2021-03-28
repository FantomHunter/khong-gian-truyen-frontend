import { state } from '@angular/animations';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Product } from 'src/app/core/model/product.model';
import { TopViewsFilter } from 'src/app/core/model/top-views-filter.enum.model';
import { TopViewsApiActions } from '../action';

export const topViewsFeatureKey = 'topViews';

export interface State extends EntityState<Product> {
  filterType: TopViewsFilter;
}

export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>({
  selectId: (product: Product) => product.id,
});

export const initialState: State = adapter.getInitialState({
  filterType: TopViewsFilter.DAY,
});

export const reducer = createReducer(
  initialState,
  on(TopViewsApiActions.loadTopViewsApis, (state, { size, filterType }) => ({
    ...state,
    filterType: filterType,
  })),
  on(TopViewsApiActions.loadTopViewsApisSuccess, (state, { products }) =>
    adapter.setAll(products, state)
  ),
  on(
    TopViewsApiActions.loadTopViewsApisFailure,
    (state, action) => initialState
  )
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
