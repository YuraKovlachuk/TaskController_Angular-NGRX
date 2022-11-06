import {AppState} from "../app.state";
import {createSelector} from "@ngrx/store";
import {AuthState} from "./auth.reducers";


export const authSelect = (state: AppState) => state.auth
export const userSelector = createSelector(
  authSelect,
  (state: AuthState) => state.user
)
export const authErrorSelector = createSelector(
  authSelect,
  (state: AuthState) => state.error
)
export const authSuccessSelector = createSelector(
  authSelect,
  (state: AuthState) => state.successChangePassword
)
export const usernameErrorSelector = createSelector(
  authSelect,
  (state: AuthState) => state.usernameError
)

export const passwordErrorSelector = createSelector(
  authSelect,
  (state: AuthState) => state.passwordError
)
