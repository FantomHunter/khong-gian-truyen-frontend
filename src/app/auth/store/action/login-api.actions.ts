import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/core/model/user.model';

export const loadLoginApiSuccess = createAction(
  '[LoginApi] Load LoginApi Success',
  props<{ user: User }>()
);

export const loadLoginApiFailure = createAction(
  '[LoginApi] Load LoginApi Failure',
  props<{ error: any }>()
);
