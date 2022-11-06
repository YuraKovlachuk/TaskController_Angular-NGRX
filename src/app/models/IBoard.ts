import {ITask} from "./ITask";

export interface IBoard {
  _id: string
  name: string,
  userId: string,
  description: string,
  tasks_count: {
    todo: number,
    progress: number,
    done: number
  }
  color: string,
  createdAt: Date,
  tasks: ITask[],
  column_color: {
    todo: string,
    progress: string,
    done: string
  }
}

export interface IBoardCredentials {
  name: string,
  description: string,
  color: string
}

export interface boardResponse {
  offset?: number,
  limit?: number,
  count: number,
  boards: IBoard[]
}

export interface boardErrorRes {
  message: string
  error?: string
}
