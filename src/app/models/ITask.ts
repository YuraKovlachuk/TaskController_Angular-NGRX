import {IComment} from "./IComment";

export interface ITask {
  _id: string
  boardId: string
  name: string,
  description: string,
  status: 'TODO' | 'PROGRESS' | 'DONE',
  image?: string,
  isArchived: boolean,
  createdAt: Date,
  comments: IComment[]
}
