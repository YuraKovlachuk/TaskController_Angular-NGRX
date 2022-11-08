import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {debounceTime, from, of} from 'rxjs';
import {map, mergeMap, catchError} from 'rxjs/operators';
import {
  authFailure,
  clearError,
  loginRequest,
  loginSuccess,
  logout,
  registerRequest,
  registerSuccess
} from "./auth.actions";
import {Store} from "@ngrx/store";
import {AppState} from "../app.state";
import {AuthService} from "../../services/auth.service";
import {IUser} from "../../models/IUser";
import {Router} from "@angular/router";

@Injectable()
export class AuthEffects {
  login$ = createEffect(() => this.actions$.pipe(
      ofType(loginRequest),
      mergeMap((action) => this.authService.login(action.credential)
        .pipe(
          map((user: IUser) => {
            this.router.navigate(['dashboard'])
            return loginSuccess({user})
          }),
          catchError(error => {
            return of(authFailure({error: error.error.message}))
          })
        ))
    )
  );

  register$ = createEffect(() => this.actions$.pipe(
    ofType(registerRequest),
    mergeMap((action) => this.authService.register(action.credential)
      .pipe(
        map(() => {
          this.router.navigate(['login'])
          return registerSuccess()
        }),
        catchError(error => of(authFailure({error: error.error.message})))
      ))
  ))

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(logout),
    mergeMap(() => this.authService.logout()
      .pipe(
        map(() => {
          this.router.navigate(['login'])
        })
      ))
  ), {dispatch: false})

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private authService: AuthService,
    private router: Router
  ) {
  }
}
