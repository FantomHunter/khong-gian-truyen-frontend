import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { AuthenticationServiceApi } from 'src/app/core/service/auth.service.api';
import { LoginApiActions, LoginPageActions } from '../action';

@Injectable()
export class LoginEffects {
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LoginPageActions.performLogin),
      concatMap(({ credential }) =>
        this.authService.login(credential).pipe(
          map((user) => LoginApiActions.loadLoginApiSuccess({ user })),
          catchError((error) =>
            of(LoginApiActions.loadLoginApiFailure({ error }))
          )
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private authService: AuthenticationServiceApi
  ) {}
}
