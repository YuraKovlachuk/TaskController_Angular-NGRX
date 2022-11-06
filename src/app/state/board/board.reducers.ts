import {IBoard} from "../../models/IBoard";
import {createReducer, on} from "@ngrx/store";
import {
  addBoardSuccess,
  boardFailure,
  clearError,
  deleteBoardSuccess, editBoardSuccess, editColumnColorSuccess,
  getAllBoardSuccess, setBoardId
} from "./board.actions";
import {
  addTaskCommentSuccess,
  addTaskSuccess, archiveTaskSuccess, deleteTaskCommentSuccess,
  deleteTaskImgSuccess,
  deleteTaskSuccess, editTaskCommentSuccess,
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
}

export const initialState: BoardState = {
  boards: [],
  selectedBoardId: '',
  selectedTaskId: '',
  error: ''
};

export const boardReducers = createReducer(
  initialState,
  on(getAllBoardSuccess, (state, {boards}) => ({
    ...state,
    boards: [...boards]
  })),
  on(addBoardSuccess, (state, {board}) => ({
    ...state,
    boards: [...state.boards, board]
  })),
  on(boardFailure, (state, {error}) =>({
    ...state,
    error: error
  })),
  on(deleteBoardSuccess, (state, {boardId}) => ({
    ...state,
    boards: state.boards.filter(board => board._id !== boardId)
  })),
  on(clearError, (state) =>({
    ...state,
    error: ''
  })),
  on(editBoardSuccess, (state, {board}) => {
    const editedBoards = [...state.boards];
    for (let i = 0; i < state.boards.length; i++) {
      if (state.boards[i]._id === board._id) {
        // if(column) {
        //   let editColumn_color = {...state.boards[i].column_color}
        //   editColumn_color[column as keyof typeof board.column_color] = board.color
        //   board = {...board, column_color: editColumn_color}
        // }
        editedBoards[i] = {...state.boards[i], ...board}
        break;
      }
    }
    return {
      ...state,
      boards: editedBoards
    }
  }),
  on(editColumnColorSuccess, (state, {boardId, color, column}) => {
    const editedBoards = [...state.boards];
    editedBoards.find((board, i) => {
      if(boardId === board._id) {
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


  on(addTaskSuccess, (state, {boardId, task}) => {
    const editedBoards: IBoard[] = [...state.boards];
    editedBoards.find((board, i) => {
      if(board._id === boardId) {
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
      boards: editedBoards
    }
  }),
  on(deleteTaskSuccess, (state, {boardId, taskId, status}) => {
    let editedBoards: IBoard[] = [...state.boards];
    editedBoards.find((board, i) => {

      if(board._id === boardId) {
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
      boards: editedBoards
    }
  }),
  on(setTaskID, (state, {taskId}) => ({
    ...state,
    selectedTaskId: taskId
  })),
  on(deleteTaskImgSuccess, (state, {boardId}) => {
    let editedBoards: IBoard[] = [...state.boards];
    editedBoards.find((board, i) => {
      if(board._id === boardId) {
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
      if(board._id === boardId) {
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
      boards: editedBoards
    }
  }),
  on(archiveTaskSuccess, (state, {boardId, taskId, isArchived}) => {
    let editedBoards: IBoard[] = [...state.boards];
    editedBoards.find((board, i) => {
      if(board._id === boardId) {
        const editedTasks = [...board.tasks]

        board.tasks.find((itemTask, j) => {
          if (itemTask._id === taskId) {
            //---change count of task by status
            let task_count = {...editedBoards[i].tasks_count}
            if(isArchived) {
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
      boards: editedBoards
    }
  }),


  // -----------------------------Task's comments actions----------------------------------------


  on(addTaskCommentSuccess, (state, {boardId, comment}) => {
    let editedBoards: IBoard[] = [...state.boards];
    editedBoards.find((board, i) => {
      if(board._id === boardId) {
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
      boards: editedBoards
    }
  }),
  on(deleteTaskCommentSuccess, (state, {boardId, taskId, commentId}) => {
    let editedBoards: IBoard[] = [...state.boards];
    editedBoards.find((board, i) => {
      if(board._id === boardId) {
        const editedTasks = [...board.tasks]

        board.tasks.find((itemTask, j) => {
          if (itemTask._id === state.selectedTaskId) {
            let editedTask = {...itemTask}

            itemTask.comments.find((comment) => {
              if(comment._id === commentId) {
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
      boards: editedBoards
    }
  }),
  on(editTaskCommentSuccess, (state, {boardId, taskId, comment}) => {
    let editedBoards: IBoard[] = [...state.boards];
    editedBoards.find((board, i) => {
      if(board._id === boardId) {
        const editedTasks = [...board.tasks]

        board.tasks.find((itemTask, j) => {
          if (itemTask._id === state.selectedTaskId) {
            let editedTask = {...itemTask}
            let editedComments = [...itemTask.comments]

            itemTask.comments.find((itemComment, h) => {
              if(itemComment._id === comment._id) {
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
