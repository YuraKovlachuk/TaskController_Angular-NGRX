import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {AppState} from "../app.state";
import {
  addBoardRequest,
  addBoardSuccess,
  boardFailure, clearError,
  deleteBoardRequest,
  deleteBoardSuccess,
  editBoardRequest,
  editBoardSuccess,
  editColumnColorRequest,
  editColumnColorSuccess,
  getAllBoardRequest,
  getAllBoardSuccess, handleError
} from "./board.actions";
import { mergeMap, of} from "rxjs";
import {BoardService} from "../../services/board.service";
import {catchError, map} from "rxjs/operators";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable()
export class BoardEffects {

  allBoards$ = createEffect(() => this.actions$.pipe(
    ofType(getAllBoardRequest),
    mergeMap(() => this.boardService.getAllBoards().pipe(
      map((res) => getAllBoardSuccess({boards: res.boards})),
      catchError((error : HttpErrorResponse) => {
        if(error.status === 401) { return of(clearError())}
        return of(handleError({message: error.error.message || error.message}))
      })
    ))
  ))

  addBoard$ = createEffect(() => this.actions$.pipe(
    ofType(addBoardRequest),
    mergeMap((action) => this.boardService.addBoard(action.board).pipe(
      map(res => addBoardSuccess({board: res})),
      catchError((error : HttpErrorResponse) => {
          return of(boardFailure({error: error.error.message}))
      })
    ))
  ))

  deleteBoard$ = createEffect(() => this.actions$.pipe(
    ofType(deleteBoardRequest),
    mergeMap((action) => this.boardService.deleteBoard(action.boardId).pipe(
      map(() => deleteBoardSuccess({boardId: action.boardId}))
    ))
  ))

  editBoard$ = createEffect(() => this.actions$.pipe(
    ofType(editBoardRequest),
    mergeMap((action) => this.boardService.editBoard(action.board).pipe(
      map((res) => editBoardSuccess({board: action.board})),
      catchError((error : HttpErrorResponse) => {
        return of(boardFailure({error: error.error.message}))
      })
    ))
  ))

  editColumnColor = createEffect(() => this.actions$.pipe(
    ofType(editColumnColorRequest),
    mergeMap(({boardId, column, color}) => this.boardService.editColumnColor(boardId, color, column).pipe(
      map(() => editColumnColorSuccess({boardId, column, color}))
    ))
  ))

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private boardService: BoardService,
  ) {
  }
}
