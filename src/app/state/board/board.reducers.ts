import {IBoard} from "../../models/IBoard";
import {createReducer, on} from "@ngrx/store";
import {
  addBoardRequest,
  addBoardSuccess,
  boardFailure,
  clearError,
  deleteBoardSuccess, editBoardRequest, editBoardSuccess, editColumnColorSuccess, getAllBoardRequest,
  getAllBoardSuccess, setBoardId
} from "./board.actions";
import {
  addTaskCommentRequest,
  addTaskCommentSuccess, addTaskRequest,
  addTaskSuccess, archiveTaskRequest, archiveTaskSuccess, deleteTaskCommentRequest, deleteTaskCommentSuccess,
  deleteTaskImgSuccess, deleteTaskRequest,
  deleteTaskSuccess, editTaskCommentSuccess, editTaskRequest,
  editTaskSuccess,
  setTaskID
} from "../task/task.actions";
import {ITask} from "../../models/ITask";
import {IComment} from "../../models/IComment";

export interface BoardState {
  boards: IBoard[]
  selectedBoardId: string
  selectedTaskId: string
  error: string
  isBoardLoading: boolean
  isLoading: boolean
  isTaskLoading: boolean
  isDeleting: boolean
  isCommentLoading: boolean
  isCommentDeleting: boolean
  isArchiving: boolean
}

export const initialState: BoardState = {
  boards: [],
  selectedBoardId: '',
  selectedTaskId: '',
  error: '',
  isBoardLoading: false,
  isTaskLoading: false,
  isLoading: false,
  isDeleting: false,
  isCommentLoading: false,
  isCommentDeleting: false,
  isArchiving: false
};

export const boardReducers = createReducer(
  initialState,
  on(getAllBoardSuccess, (state, {boards}) => ({
    ...state,
    boards: [...boards],
    isBoardLoading: false
  })),
  on(addBoardSuccess, (state, {board}) => ({
    ...state,
    boards: [...state.boards, board],
    isLoading: false
  })),
  on(boardFailure, (state, {error}) => ({
    ...state,
    error: error,
    isBoardLoading: false,
    isCommentLoading: false,
    isDeleting: false,
    isLoading: false,
    isTaskLoading: false,
    isArchiving: false,
    isCommentDeleting: false
  })),
  on(getAllBoardRequest, (state) => ({
    ...state,
    isBoardLoading: true
  })),
  on(editBoardRequest, addBoardRequest, (state) => ({
    ...state,
    isLoading: true
  })),
  on(deleteBoardSuccess, (state, {boardId}) => ({
    ...state,
    boards: state.boards.filter(board => board._id !== boardId)
  })),
  on(clearError, (state) => ({
    ...state,
    error: ''
  })),
  on(editBoardSuccess, (state, {board}) => {
    const editedBoards = [...state.boards];
    for (let i = 0; i < state.boards.length; i++) {
      if (state.boards[i]._id === board._id) {
        editedBoards[i] = {...state.boards[i], ...board}
        break;
      }
    }
    return {
      ...state,
      boards: editedBoards,
      isLoading: false
    }
  }),
  on(editColumnColorSuccess, (state, {boardId, color, column}) => {
    const editedBoards = [...state.boards];
    editedBoards.find((board, i) => {
      if (boardId === board._id) {
        let editColumn_color = {...state.boards[i].column_color};
        editColumn_color[column as keyof typeof board.column_color] = color;
        const editedBoard = {...board, column_color: editColumn_color};
        editedBoards[i] = {...state.boards[i], ...editedBoard}
        return true
      }
      return false
    })
    return {
      ...state,
      boards: editedBoards
    }
  }),
  on(setBoardId, (state, {boardId}) => ({
    ...state,
    selectedBoardId: boardId
  })),


  // -----------------------------Tasks Actions----------------------------------------


  on(addTaskRequest, editTaskRequest, (state) => ({
    ...state,
    isLoading: true
  })),
  on(deleteTaskRequest, (state) => ({
    ...state,
    isDeleting: true
  })),
  on(archiveTaskRequest , (state) => ({
    ...state,
    isArchiving: true
  })),
  on(addTaskSuccess, (state, {boardId, task}) => {
    const editedBoards: IBoard[] = [...state.boards];
    editedBoards.find((board, i) => {
      if (board._id === boardId) {
        let editedTask: ITask[] = [...state.boards[i].tasks, task]
        editedBoards[i] = {...editedBoards[i], tasks: editedTask}

        //---change count of task by status
        let task_count = {...editedBoards[i].tasks_count}
        task_count[task.status.toLowerCase() as keyof typeof board.tasks_count] += 1
        editedBoards[i] = {...editedBoards[i], tasks_count: {...task_count}}
        //-------

        return true
      }
      return false
    })

    return {
      ...state,
      boards: editedBoards,
      isLoading: false
    }
  }),
  on(deleteTaskSuccess, (state, {boardId, taskId, status}) => {
    let editedBoards: IBoard[] = [...state.boards];
    editedBoards.find((board, i) => {

      if (board._id === boardId) {
        const filteredTasks: ITask[] = board.tasks.filter(task => task._id !== taskId)
        editedBoards[i] = {...editedBoards[i], tasks: filteredTasks}
        //---change count of task by status
        let task_count = {...editedBoards[i].tasks_count}
        task_count[status.toLowerCase() as keyof typeof board.tasks_count] -= 1
        editedBoards[i] = {...editedBoards[i], tasks_count: {...task_count}}
        //----
        return true
      }
      return false

    })
    return {
      ...state,
      boards: editedBoards,
      isDeleting: false
    }
  }),
  on(setTaskID, (state, {taskId}) => ({
    ...state,
    selectedTaskId: taskId
  })),
  on(deleteTaskImgSuccess, (state, {boardId}) => {
    let editedBoards: IBoard[] = [...state.boards];
    editedBoards.find((board, i) => {
      if (board._id === boardId) {
        const editedTasks = [...board.tasks]

        board.tasks.find((task, i) => {
          if (task._id === state.selectedTaskId) {
            const editedTask = {...task}
            editedTask.image = ''
            editedTasks[i] = {...editedTasks[i], ...editedTask}
            return true
          }
          return false
        })

        editedBoards[i] = {...editedBoards[i], tasks: editedTasks}
        return true
      }
      return false
    })
    return {
      ...state,
      boards: editedBoards
    }
  }),
  on(editTaskSuccess, (state, {boardId, task}) => {
    let editedBoards: IBoard[] = [...state.boards];
    editedBoards.find((board, i) => {
      if (board._id === boardId) {
        const editedTasks = [...board.tasks]

        board.tasks.find((itemTask, j) => {
          if (itemTask._id === state.selectedTaskId) {
            //---change count of task by status
            let task_count = {...editedBoards[i].tasks_count}
            task_count[itemTask.status.toLowerCase() as keyof typeof board.tasks_count] -= 1
            task_count[task.status.toLowerCase() as keyof typeof board.tasks_count] += 1
            editedBoards[i] = {...editedBoards[i], tasks_count: {...task_count}}
            //--------

            editedTasks[j] = {...editedTasks[j], ...task}

            return true
          }
          return false
        })

        editedBoards[i] = {...editedBoards[i], tasks: editedTasks}
        return true
      }
      return false
    })

    return {
      ...state,
      boards: editedBoards,
      isLoading: false
    }
  }),
  on(archiveTaskSuccess, (state, {boardId, taskId, isArchived}) => {
    let editedBoards: IBoard[] = [...state.boards];
    editedBoards.find((board, i) => {
      if (board._id === boardId) {
        const editedTasks = [...board.tasks]

        board.tasks.find((itemTask, j) => {
          if (itemTask._id === taskId) {
            //---change count of task by status
            let task_count = {...editedBoards[i].tasks_count}
            if (isArchived) {
              task_count[itemTask.status.toLowerCase() as keyof typeof board.tasks_count] -= 1
            } else {
              task_count[itemTask.status.toLowerCase() as keyof typeof board.tasks_count] += 1
            }
            editedBoards[i] = {...editedBoards[i], tasks_count: {...task_count}}
            //--------

            editedTasks[j] = {...editedTasks[j], isArchived}
            return true
          }
          return false
        })

        editedBoards[i] = {...editedBoards[i], tasks: editedTasks}
        return true
      }
      return false
    })

    return {
      ...state,
      boards: editedBoards,
      isArchiving: false
    }
  }),


  // -----------------------------Task's comments actions----------------------------------------


  on(addTaskCommentRequest, (state) => ({
    ...state,
    isCommentLoading: true
  })),
  on(deleteTaskCommentRequest, (state) => ({
    ...state,
    isCommentDeleting: true
  })),
  on(addTaskCommentSuccess, (state, {boardId, comment}) => {
    let editedBoards: IBoard[] = [...state.boards];
    editedBoards.find((board, i) => {
      if (board._id === boardId) {
        const editedTasks = [...board.tasks]
        board.tasks.find((itemTask, j) => {
          if (itemTask._id === state.selectedTaskId) {
            let editedComments: IComment[] = [...board.tasks[j].comments, comment]
            let editedTask = {...itemTask, comments: editedComments}

            editedTasks[j] = {...editedTasks[j], ...editedTask}
            editedBoards[i] = {...editedBoards[i], tasks: editedTasks}
            return true
          }
          return false
        })

        editedBoards[i] = {...editedBoards[i], tasks: editedTasks}
        return true
      }
      return false
    })

    return {
      ...state,
      boards: editedBoards,
      isCommentLoading: false
    }
  }),
  on(deleteTaskCommentSuccess, (state, {boardId, taskId, commentId}) => {
    let editedBoards: IBoard[] = [...state.boards];
    editedBoards.find((board, i) => {
      if (board._id === boardId) {
        const editedTasks = [...board.tasks]

        board.tasks.find((itemTask, j) => {
          if (itemTask._id === state.selectedTaskId) {
            let editedTask = {...itemTask}

            itemTask.comments.find((comment) => {
              if (comment._id === commentId) {
                const filteredComment: IComment[] = itemTask.comments.filter(comment => comment._id !== commentId)
                editedTask = {...editedTask, comments: filteredComment}
                return true
              }
              return false
            })

            editedTasks[j] = {...editedTasks[j], ...editedTask}
            editedBoards[i] = {...editedBoards[i], tasks: editedTasks}
            return true
          }
          return false
        })

        editedBoards[i] = {...editedBoards[i], tasks: editedTasks}
        return true
      }
      return false
    })

    return {
      ...state,
      boards: editedBoards,
      isCommentDeleting: false
    }
  }),
  on(editTaskCommentSuccess, (state, {boardId, taskId, comment}) => {
    let editedBoards: IBoard[] = [...state.boards];
    editedBoards.find((board, i) => {
      if (board._id === boardId) {
        const editedTasks = [...board.tasks]

        board.tasks.find((itemTask, j) => {
          if (itemTask._id === state.selectedTaskId) {
            let editedTask = {...itemTask}
            let editedComments = [...itemTask.comments]

            itemTask.comments.find((itemComment, h) => {
              if (itemComment._id === comment._id) {
                editedComments[h] = {...editedComments[h], ...comment}
                editedTask = {...editedTask, comments: editedComments}
                return true
              }
              return false
            })

            editedTasks[j] = {...editedTasks[j], ...editedTask}
            editedBoards[i] = {...editedBoards[i], tasks: editedTasks}
            return true
          }
          return false
        })

        editedBoards[i] = {...editedBoards[i], tasks: editedTasks}
        return true
      }
      return false
    })

    return {
      ...state,
      boards: editedBoards
    }
  })
)
