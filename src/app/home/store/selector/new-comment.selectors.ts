import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NewCommentReducer } from '../reducer';
export const selectNewCommentProductsState = createFeatureSelector<NewCommentReducer.State>(
  NewCommentReducer.newCommentFeatureKey
);

export const selectNewCommentProducts = createSelector(
  selectNewCommentProductsState,
  NewCommentReducer.selectAll
);
