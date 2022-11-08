import {createAction, props} from "@ngrx/store";
import {Credentials, IUser} from "../../models/IUser";

export const loginRequest= createAction(
  '[Auth] Login Request',
  props<{credential: Credentials}>()
)

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{user: IUser}>()
)

export const registerRequest = createAction(
  '[Auth] Register request',
  props<{credential: Credentials}>()
)

export const registerSuccess = createAction(
  '[Auth] Register Success'
)

export const authFailure = createAction(
  '[Auth] Login Failure',
  props<{error: string}>()
)

export const clearError = createAction(
  '[Auth] Clear error message'
)

export const isAuth = createAction(
  '[Auth] Check user auth',
  props<{user: IUser}>()
)

export const logout = createAction(
  '[Auth] Logout'
)


