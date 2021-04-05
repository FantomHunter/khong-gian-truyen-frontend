import { Action, createReducer, on } from '@ngrx/store';
import { User } from 'src/app/core/model/user.model';
import { LoginApiActions, LoginPageActions, NavbarActions } from '../action';

export const loginStatusFeatureKey = 'loginStatus';

export interface State {
  user: User | null;
  redirectUrl: string;
}

export const initialState: State = {
  user: null,
  redirectUrl: '/',
};

export const reducer = createReducer(
  initialState,
  on(LoginPageActions.loadLoginPages, (state, { redirectUrl }) => ({
    ...state,
    redirectUrl,
  })),
  on(LoginApiActions.loadLoginApiSuccess, (state, { user }) => ({
    ...state,
    user,
  })),
  on(LoginApiActions.loadLoginApiFailure, (state, action) => ({
    ...state,
    user: null,
  })),
  on(NavbarActions.logout, (state, action) => ({
    user: null,
    redirectUrl: '/',
  }))
);
