import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DetailProductReducer } from '../reducer';

export const selectDetailProductState = createFeatureSelector<DetailProductReducer.State>(
  DetailProductReducer.detailsFeatureKey
);

export const selectDetailsProduct = createSelector(
  selectDetailProductState,
  (state: DetailProductReducer.State) => state.productDetails
);
