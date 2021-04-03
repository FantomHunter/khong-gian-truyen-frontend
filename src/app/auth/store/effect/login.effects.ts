import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { AuthenticationServiceApi } from 'src/app/core/service/auth.service.api';
import { LoginApiActions, LoginPageActions } from '../action';
import swal from 'sweetalert2';

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

  showAlertWhenFailedLogin$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LoginApiActions.loadLoginApiFailure),
        tap(({ error }) => swal.fire('Login Failed', error, 'error'))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authService: AuthenticationServiceApi
  ) {}
}
