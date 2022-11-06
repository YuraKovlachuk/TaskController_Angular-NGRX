import {ActionReducer, INIT} from '@ngrx/store';
import {logout} from './auth/auth.actions'
import {AppState} from "./app.state";
import {deleteUserSuccess} from "./user/user.actions";

export function logoutState(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return (state, action) => {
    if ( action != null && action.type === logout.type ||
      action != null && action.type === deleteUserSuccess.type) {
      return reducer( undefined, {type: INIT});
    }
    return reducer(state, action);
  };
}
