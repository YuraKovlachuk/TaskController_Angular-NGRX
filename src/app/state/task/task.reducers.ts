// import {ITask} from "../../models/ITask";
// import {createReducer, on} from "@ngrx/store";
// import {
//   addTaskSuccess,
//   clearError,
//   deleteTaskImgSuccess,
//   deleteTaskSuccess, editTaskSuccess,
//   getAllTasks,
//   setTaskID,
//   taskFailure
// } from "./task.actions";
//
//
// export interface TaskState {
//   tasks: ITask[]
//   selectedId: string,
//   error: string
// }
//
// export const initialState: TaskState = {
//   tasks: [],
//   selectedId: '',
//   error: ''
// };
//
// export const taskReducers = createReducer(
//   initialState,
//   on(getAllTasks, (state, {tasks}) => ({
//     ...state,
//     tasks: tasks
//   })),
//   // on(addTaskSuccess, (state, {task}) => ({
//   //   ...state,
//   //   tasks: [...state.tasks, task]
//   // })),
//   on(taskFailure, (state, {error}) => ({
//     ...state,
//     error: error
//   })),
//   on(clearError, (state) => ({
//     ...state,
//     error: ''
//   })),
//   on(deleteTaskSuccess, (state, {taskId}) => ({
//     ...state,
//     tasks: state.tasks.filter(task => task._id !== taskId)
//   })),
//   on(setTaskID, (state, {taskId}) => ({
//     ...state,
//     selectedId: taskId
//   })),
//   on(deleteTaskImgSuccess, (state => {
//     const editedTasks = [...state.tasks];
//     state.tasks.find((task, i) => {
//       if (task._id === state.selectedId) {
//         const editedTask = {...state.tasks[i]}
//         editedTask.image = ''
//         editedTasks[i] = {...state.tasks[i], ...editedTask}
//         return true
//       }
//       return false
//     })
//     return {
//       ...state,
//       tasks: editedTasks
//     }
//   })),
//   on(editTaskSuccess, (state, {task}) => {
//     const editedTasks = [...state.tasks];
//     state.tasks.find((itemTask, i) => {
//       if (itemTask._id === state.selectedId) {
//         editedTasks[i] = {...state.tasks[i], ...task}
//         return true
//       }
//       return false
//     })
//
//     return {
//       ...state,
//       tasks: editedTasks
//     }
//   })
// )
