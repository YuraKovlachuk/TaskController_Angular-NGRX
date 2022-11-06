import {createAction, props} from "@ngrx/store";
import {ITask} from "../../models/ITask";
import {IComment} from "../../models/IComment";


export const getAllTasks = createAction(
  '[Board] Get all tasks',
  props<{ tasks: ITask[] }>()
)

export const addTaskRequest = createAction(
  '[Board] Request add task',
  props<{ boardId: string, data: FormData }>()
)

export const addTaskSuccess = createAction(
  '[Board] Success add task',
  props<{ boardId: string, task: ITask }>()
)

export const taskFailure = createAction(
  '[Board] Failure task',
  props<{ error: string }>()
)

export const clearError = createAction(
  '[Board] Clear error message'
)

export const deleteTaskRequest = createAction(
  '[Board] Request delete task',
  props<{ boardId: string, taskId: string, status: string }>()
)

export const deleteTaskSuccess = createAction(
  '[Board] Success delete task',
  props<{ boardId: string, taskId: string, status: string }>()
)

export const setTaskID = createAction(
  '[Board] Set selected taskID',
  props<{ taskId: string }>()
)

export const deleteTaskImgRequest = createAction(
  '[Board] Request delete task image',
  props<{ boardId: string, taskId: string }>()
)

export const deleteTaskImgSuccess = createAction(
  '[Board] Success delete task image',
  props<{ boardId: string}>()
)

export const editTaskRequest = createAction(
  '[Board] Request edit task',
  props<{ boardId: string, taskId: string, data: FormData }>()
)

export const editTaskSuccess = createAction(
  '[Board] Success edit task',
  props<{boardId: string, task: ITask }>()
)

export const addTaskCommentRequest = createAction(
  '[Task] Request add task comment',
  props<{ boardId: string, taskId: string, text: string }>()
)

export const addTaskCommentSuccess = createAction(
  '[Task] Success add task comment',
  props<{ boardId: string, taskId: string, comment: IComment }>()
)

export const deleteTaskCommentRequest = createAction(
  '[Task] Request delete task comment',
  props<{ boardId: string, taskId: string, commentId: string }>()
)

export const deleteTaskCommentSuccess = createAction(
  '[Task] Success delete task comment',
  props<{ boardId: string, taskId: string, commentId: string }>()
)

export const editTaskCommentRequest = createAction(
  '[Task] Request edit task comment',
  props<{ boardId: string, taskId: string, comment: IComment }>()
)

export const editTaskCommentSuccess = createAction(
  '[Task] Success edit task comment',
  props<{ boardId: string, taskId: string, comment: IComment }>()
)

export const archiveTaskRequest = createAction(
  '[Task] Request archive Task',
  props<{boardId: string, taskId: string, isArchived: boolean}>()
)

export const archiveTaskSuccess = createAction(
  '[Task] Success archive Task',
  props<{boardId: string, taskId: string, isArchived: boolean}>()
)
