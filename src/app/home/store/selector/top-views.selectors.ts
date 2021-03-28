import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TopViewsReducer } from '../reducer';

export const selectTopViewsProductsState = createFeatureSelector<TopViewsReducer.State>(
  TopViewsReducer.topViewsFeatureKey
);

export const selectTopViewsProducts = createSelector(
  selectTopViewsProductsState,
  TopViewsReducer.selectAll
);
