import {createReducer, on} from "@ngrx/store";
import {
  authFailure,
  clearError,
  isAuth,
  loginRequest,
  loginSuccess,
  logout,
  registerRequest,
  registerSuccess
} from "./auth.actions";
import {IUser} from "../../models/IUser";
import {
  clearSuccessMessage,
  deleteUserAvatarSuccess, deleteUserSuccess, editPasswordFailure, editPasswordRequest,
  editPasswordSuccess, editUsernameFailure, editUsernameRequest,
  editUsernameSuccess,
  uploadUserAvatarSuccess
} from "../user/user.actions";

export interface AuthState {
  user: IUser | null
  defaultAvatar: string
  error: string
  usernameError: string
  passwordError: string
  isUsernameLoading: boolean
  isPasswordLoading: boolean
  successChangePassword: string
  isLoading: boolean
}

const initialState: AuthState = {
  user: null,
  defaultAvatar: 'img\\default-avatar.png',
  error: '',
  usernameError: '',
  passwordError: '',
  isUsernameLoading: false,
  isPasswordLoading: false,
  successChangePassword: '',
  isLoading: false
};

export const authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, {user}) => ({
    ...state,
    user: {...user},
    isLoading: false
  })),
  on(registerRequest, loginRequest, (state) => ({
    ...state,
    isLoading: true
  })),
  on(registerSuccess, (state) => ({
    ...state,
    isLoading: false
  })),
  on(authFailure, (state, {error}) => ({
    ...state,
    error: error,
    isLoading: false
  })),
  on(clearError, (state) => ({
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
  on(editUsernameRequest, (state) => ({
    ...state,
    isUsernameLoading: true
  })),
  on(editUsernameSuccess, (state, {username}) => ({
    ...state,
    user: {...state.user!, username},
    isUsernameLoading: false
  })),
  on(editPasswordRequest, (state) => ({
    ...state,
    isPasswordLoading: true
  })),
  on(editPasswordSuccess, (state, {message}) => ({
    ...state,
    successChangePassword: message,
    isPasswordLoading: false
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
    usernameError: error,
    isUsernameLoading: false
  })),
  on(editPasswordFailure, (state, {error}) => ({
    ...state,
    passwordError: error,
    isPasswordLoading: false
  }))
)
