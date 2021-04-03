import {
  Action,
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { LoginStatusReducer } from '../auth/store/reducer';
import { merge } from 'lodash';
import { localStorageSync } from 'ngrx-store-localstorage';

const INIT_ACTION = '@ngrx/store/init';
const UPDATE_ACTION = '@ngrx/store/update-reducers';

export interface AppState {}

export const reducers: ActionReducerMap<AppState> = {
  [LoginStatusReducer.loginStatusFeatureKey]: LoginStatusReducer.reducer,
};

const mergeReducer = (
  state: AppState,
  rehydratedState: AppState,
  action: Action
) => {
  if (
    (action.type === INIT_ACTION || action.type === UPDATE_ACTION) &&
    rehydratedState
  ) {
    state = merge(state, rehydratedState);
  }

  return state;
};

function localStorageSyncReducer(
  reducer: ActionReducer<AppState>
): ActionReducer<AppState> {
  return localStorageSync({
    keys: [{ [LoginStatusReducer.loginStatusFeatureKey]: ['user'] }],
    rehydrate: true,
    mergeReducer,
  })(reducer);
}
// console.log all actions
export function logger(
  reducer: ActionReducer<AppState>
): ActionReducer<AppState> {
  return (state, action) => {
    const result = reducer(state, action);
    console.groupCollapsed(action.type);
    console.log('prev state', state);
    console.log('action', action);
    console.log('next state', result);
    console.groupEnd();

    return result;
  };
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? [logger, localStorageSyncReducer]
  : [localStorageSyncReducer];
