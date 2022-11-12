import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {AppState} from "../app.state";
import {mergeMap, of} from "rxjs";
import {TaskService} from "../../services/task.service";
import {catchError, map} from "rxjs/operators";
import {
  addTaskCommentRequest,
  addTaskCommentSuccess,
  addTaskRequest,
  addTaskSuccess, archiveTaskRequest, archiveTaskSuccess, deleteTaskCommentRequest, deleteTaskCommentSuccess,
  deleteTaskImgRequest, deleteTaskImgSuccess,
  deleteTaskRequest,
  deleteTaskSuccess, editTaskCommentRequest, editTaskCommentSuccess, editTaskRequest, editTaskSuccess,
} from "./task.actions";
import {HttpErrorResponse} from "@angular/common/http";
import {boardFailure} from "../board/board.actions";

@Injectable()
export class TaskEffects {

  addTask$ = createEffect(() => this.actions$.pipe(
    ofType(addTaskRequest),
    mergeMap(({boardId, data}) => this.taskService.addTask(boardId, data).pipe(
      map((res) => addTaskSuccess({boardId , task: res})),
      catchError((error : HttpErrorResponse) => {
        return of(boardFailure({error: error.error.message}))
      })
    ))
  ))

  deleteTask$ = createEffect(() => this.actions$.pipe(
    ofType(deleteTaskRequest),
    mergeMap(({boardId, taskId, status}) => this.taskService.deleteTask(boardId, taskId).pipe(
      map(() => deleteTaskSuccess({boardId, taskId, status}))
    ))
  ))

  deleteImageTask$ = createEffect(() => this.actions$.pipe(
    ofType(deleteTaskImgRequest),
    mergeMap(({boardId, taskId}) => this.taskService.deleteTaskImage(boardId, taskId).pipe(
      map(() => deleteTaskImgSuccess({boardId}))
    ))
  ))

  editTask$ = createEffect(()=> this.actions$.pipe(
    ofType(editTaskRequest),
    mergeMap(({boardId, taskId, data}) => this.taskService.editTask(boardId, taskId, data).pipe(
      map((res) => editTaskSuccess({boardId, task: res.result})),
      catchError((error : HttpErrorResponse) => {
        return of(boardFailure({error: error.error.message}))
      })
    ))
  ))

  addComment$ = createEffect(() => this.actions$.pipe(
    ofType(addTaskCommentRequest),
    mergeMap(({boardId, taskId, text}) => this.taskService.addTaskComment(boardId, taskId, text).pipe(
      map((res) => addTaskCommentSuccess({boardId, taskId, comment: res}))
    ))
  ))

  deleteComment$ = createEffect(() => this.actions$.pipe(
    ofType(deleteTaskCommentRequest),
    mergeMap(({boardId, taskId, commentId}) => this.taskService.deleteCommentTask(boardId, taskId, commentId).pipe(
      map(() => deleteTaskCommentSuccess({boardId, taskId, commentId}))
    ))
  ))

  editComment$ = createEffect(() => this.actions$.pipe(
    ofType(editTaskCommentRequest),
    mergeMap(({boardId, taskId, comment}) => this.taskService.editCommentTask(boardId, taskId, comment).pipe(
      map((res) => editTaskCommentSuccess({boardId, taskId, comment: res.result})),
      catchError((error : HttpErrorResponse) => {
        console.log(error)
        return of(boardFailure({error: error.error.message}))
      })
    ))
  ))

  archiveTask$ = createEffect(() => this.actions$.pipe(
    ofType(archiveTaskRequest),
    mergeMap(({boardId, taskId, isArchived}) => this.taskService.archiveTask(boardId, taskId, isArchived).pipe(
      map(() => archiveTaskSuccess({boardId, taskId, isArchived}))
    ))
  ))

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private taskService: TaskService,
  ) {
  }
}
