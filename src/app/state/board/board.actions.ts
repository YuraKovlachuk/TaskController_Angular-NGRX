import {createAction, props} from "@ngrx/store";
import {IBoard} from "../../models/IBoard";


export const getAllBoardRequest = createAction(
  '[Dashboard] Request get all boards'
)

export const getAllBoardSuccess = createAction(
  '[Dashboard] Success get all boards',
  props<{ boards: IBoard[] }>()
)

export const addBoardRequest = createAction(
  '[Dashboard] Request to add board',
  props<{ board: IBoard }>()
)

export const addBoardSuccess = createAction(
  '[Dashboard] Success add board',
  props<{ board: IBoard }>()
)

export const boardFailure = createAction(
  '[Dashboard] Failure board',
  props<{ error: string }>()
)

export const deleteBoardRequest = createAction(
  '[Dashboard] Request to delete board',
  props<{ boardId: string }>()
)

export const clearError = createAction(
  '[Dashboard] Clear error message'
)

export const deleteBoardSuccess = createAction(
  '[Dashboard] Success delete board',
  props<{ boardId: string }>()
)

export const editBoardRequest = createAction(
  '[Dashboard] Request to edit board',
  props<{ board: IBoard }>()
)

export const editBoardSuccess = createAction(
  '[Dashboard] Success edit board',
  props<{ board: IBoard}>()
)

export const editColumnColorRequest = createAction(
  '[Dashboard] Request to edit column color',
  props<{ boardId: string, color: string, column:string }>()
)

export const editColumnColorSuccess = createAction(
  '[Dashboard] Success to edit column color',
  props<{ boardId: string, color: string, column:string }>()
)

export const setBoardId = createAction(
  '[Board] Set board id',
  props<{ boardId: string }>()
)
