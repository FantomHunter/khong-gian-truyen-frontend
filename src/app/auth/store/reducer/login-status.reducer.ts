import { Action, createReducer, on } from '@ngrx/store';
import { User } from 'src/app/core/model/user.model';
import { LoginApiActions } from '../action';

export const loginStatusFeatureKey = 'loginStatus';

export interface State {
  user: User | null;
}

export const initialState: State = {
  user: null,
};

export const reducer = createReducer(
  initialState,
  on(LoginApiActions.loadLoginApiSuccess, (state, { user }) => ({
    ...state,
    user,
  })),
  on(LoginApiActions.loadLoginApiFailure, (state, action) => initialState)
);
