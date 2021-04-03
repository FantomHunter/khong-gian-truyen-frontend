import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LoginStatusReducer } from '../reducer';

export const selectAuthenticationStatusState = createFeatureSelector<LoginStatusReducer.State>(
  LoginStatusReducer.loginStatusFeatureKey
);

export const selectCurrentUser = createSelector(
  selectAuthenticationStatusState,
  (state) => state.user
);

export const selectIsLoggedIn = createSelector(
  selectAuthenticationStatusState,
  (state) => (state.user != null ? true : false)
);
