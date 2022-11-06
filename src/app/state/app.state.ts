import {authReducer, AuthState} from "./auth/auth.reducers";
import {ActionReducerMap, MetaReducer} from "@ngrx/store";
import {boardReducers, BoardState} from "./board/board.reducers";
import {logoutState} from "./meta.reducers";

export interface AppState {
  auth: AuthState,
  boards: BoardState
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: authReducer,
  boards: boardReducers
}

export const metaReducers: MetaReducer<AppState>[] = [logoutState];
