import {createReducer, on} from "@ngrx/store";
import {authFailure, clearError, isAuth, loginSuccess, logout} from "./auth.actions";
import {IUser} from "../../models/IUser";
import {
  clearSuccessMessage,
  deleteUserAvatarSuccess, deleteUserSuccess, editPasswordFailure,
  editPasswordSuccess, editUsernameFailure,
  editUsernameSuccess,
  uploadUserAvatarSuccess
} from "../user/user.actions";

export interface AuthState {
  user: IUser | null
  defaultAvatar: string
  error: string
  usernameError: string
  passwordError: string
  successChangePassword: string
}

const initialState: AuthState = {
  user: null,
  defaultAvatar: 'img\\default-avatar.png',
  error: '',
  usernameError: '',
  passwordError: '',
  successChangePassword: ''
};

export const authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, {user}) => ({
    ...state,
    user: {...user}
  })),
  on(authFailure, (state, {error}) =>({
    ...state,
    error: error
  })),
  on(clearError, (state) =>({
    ...state,
    error: '',
    passwordError: '',
    usernameError: ''
  })),
  on(logout, (state) => ({
    ...state,
    user: null
  })),
  on(isAuth, (state, {user}) => ({
    ...state,
    user: {...user}
  })),
  on(uploadUserAvatarSuccess, (state, {avatar}) => ({
      ...state,
      user: {...state.user!, avatar}
  })),
  on(deleteUserAvatarSuccess, (state) => ({
    ...state,
    user: {...state.user!, avatar: state.defaultAvatar}
  })),
  on(editUsernameSuccess, (state, {username}) => ({
    ...state,
    user: {...state.user!, username}
  })),
  on(editPasswordSuccess, (state, {message})=>({
    ...state,
    successChangePassword: message
  })),
  on(clearSuccessMessage, (state) => ({
    ...state,
    successChangePassword: ''
  })),
  on(deleteUserSuccess, (state) => ({
    ...state,
    user: null
  })),
  on(editUsernameFailure, (state, {error}) => ({
    ...state,
    usernameError: error
  })),
  on(editPasswordFailure, (state, {error}) => ({
    ...state,
    passwordError: error
  }))
)
