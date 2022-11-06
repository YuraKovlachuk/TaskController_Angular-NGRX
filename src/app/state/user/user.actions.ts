import {createAction, props} from "@ngrx/store";


export const uploadUserAvatarRequest = createAction(
  '[Profile] Request upload user avatar',
  props<{data: FormData}>()
)

export const uploadUserAvatarSuccess = createAction(
  '[Profile] Success upload user avatar',
  props<{avatar: string}>()
)

export const deleteUserAvatarRequest = createAction(
  '[Profile] Request delete user avatar',
)

export const deleteUserAvatarSuccess = createAction(
  '[Profile] Success delete user avatar'
)

export const userFailure = createAction(
  '[Profile] User Failure',
  props<{error: string}>()
)

export const editUsernameRequest = createAction(
  '[Profile] Request edit username',
  props<{username: string}>()
)

export const editUsernameSuccess = createAction(
  '[Profile] Success edit username',
  props<{username: string}>()
)

export const editUsernameFailure = createAction(
  '[Profile] Failure edit username',
  props<{error: string}>()
)

export const editPasswordRequest = createAction(
  '[Profile] Request edit password',
  props<{oldPassword: string, newPassword: string}>()
)

export const editPasswordSuccess = createAction(
  '[Profile] Success edit password',
  props<{message: string}>()
)

export const editPasswordFailure = createAction(
  '[Profile] Failure edit password',
  props<{error: string}>()
)

export const clearSuccessMessage = createAction(
  '[Profile] Clear success message'
)

export const deleteUserRequset = createAction(
  '[Profile] Delete user request'
)

export const deleteUserSuccess = createAction(
  '[Profile] Delete user success'
)

