import {AppState} from "../app.state";
import {createSelector} from "@ngrx/store";
import {BoardState} from "./board.reducers";
import {IBoard} from "../../models/IBoard";
import {ITask} from "../../models/ITask";

export const boardSelect = (state: AppState) => state.boards
export const boardsSelector = createSelector(
  boardSelect,
  (state: BoardState) => state.boards
)

export const boardsErrorSelector = createSelector(
  boardSelect,
  (state: BoardState) => state.error
)

export const boardsLoadingSelector = createSelector(
  boardSelect,
  (state: BoardState) => state.isBoardLoading
)

export const isLoadingBoard = createSelector(
  boardSelect,
  (state: BoardState) => state.isLoading
)

export const isDeleting = createSelector(
  boardSelect,
  (state: BoardState) => state.isDeleting
)

export const isCommentLoading = createSelector(
  boardSelect,
  (state: BoardState) => state.isCommentLoading
)

export const isArchiving = createSelector(
  boardSelect,
  (state: BoardState) => state.isArchiving
)

export const isCommentDeleting = createSelector(
  boardSelect,
  (state: BoardState) => state.isCommentDeleting
)

export const tasksLoadingSelector = createSelector(
  boardSelect,
  (state: BoardState) => state.isTaskLoading
)

export const boardSelectById = (id: string) =>
  createSelector(
  boardSelect,
  (state: BoardState) => {
    return state.boards.find(board => board._id === id) as IBoard
  }
)

export const taskSelectById = createSelector(
  boardSelect,
  (state: BoardState) => {
    let task: ITask = {} as ITask
    state.boards.find(board => {
      if(board._id === state.selectedBoardId) {
        task = board.tasks.find(task => task._id === state.selectedTaskId)!
        return true
      }
      return false
    })
    return task
  }
)
