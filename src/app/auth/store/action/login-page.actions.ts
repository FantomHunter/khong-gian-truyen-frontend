import { createAction, props } from '@ngrx/store';
import { Credential } from 'src/app/core/model/user.model';

export const loadLoginPages = createAction('[LoginPage] Load LoginPages');

export const performLogin = createAction(
  '[LoginPage] Perform login',
  props<{ credential: Credential }>()
);
