import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {AppState} from "../app.state";
import {UserService} from "../../services/user.service";
import {
  deleteUserAvatarRequest,
  deleteUserAvatarSuccess,
  deleteUserRequset, deleteUserSuccess, editPasswordFailure,
  editPasswordRequest,
  editPasswordSuccess, editUsernameFailure,
  editUsernameRequest,
  editUsernameSuccess,
  uploadUserAvatarRequest,
  uploadUserAvatarSuccess,
} from "./user.actions";
import {mergeMap, of} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {HttpErrorResponse} from "@angular/common/http";
import {authFailure} from "../auth/auth.actions";
import { Router} from "@angular/router";

@Injectable()
export class UserEffects {

  uploadAvatar$ = createEffect(() => this.actions$.pipe(
    ofType(uploadUserAvatarRequest),
    mergeMap(({data}) => this.userService.uploadUserAvatar(data).pipe(
      map((res) => uploadUserAvatarSuccess({avatar: res.avatar}))
    ))
  ))

  deleteAvatar$ = createEffect(() => this.actions$.pipe(
    ofType(deleteUserAvatarRequest),
    mergeMap(() => this.userService.deleteUserAvatar().pipe(
      map(() => deleteUserAvatarSuccess()),
      catchError((error : HttpErrorResponse) => {
        return of(authFailure({error: error.error.message}))
      })
    ))
  ))

  editUsername$ = createEffect(() => this.actions$.pipe(
    ofType(editUsernameRequest),
    mergeMap(({username}) => this.userService.editUsername(username).pipe(
      map((res) => editUsernameSuccess({username: res.username})),
      catchError((error : HttpErrorResponse) => {
        console.log(error)
        return of(editUsernameFailure({error: error.error.message}))
      })
    ))
  ))

  editPassword$ = createEffect(() => this.actions$.pipe(
    ofType(editPasswordRequest),
    mergeMap(({oldPassword, newPassword}) => this.userService.changePassword(oldPassword, newPassword).pipe(
      map((res) => editPasswordSuccess({message: res.message})),
      catchError((error : HttpErrorResponse) => {
        console.log(error)
        return of(editPasswordFailure({error: error.error.message}))
      })
    ))
  ))

  deleteUser$ = createEffect(() => this.actions$.pipe(
    ofType(deleteUserRequset),
    mergeMap(() => this.userService.deleteUser().pipe(
      map(() => {
        this.router.navigate(['register'])
        return deleteUserSuccess()}),
      catchError((error : HttpErrorResponse) => {
        return of(authFailure({error: error.error.message}))
      })
    ))
  ))

  constructor(
    private actions$: Actions,
    private router: Router,
    private store: Store<AppState>,
    private userService: UserService
  ) {
  }
}
