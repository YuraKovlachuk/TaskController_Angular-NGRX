import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {urls} from "../contants/urls";
import {ITask} from "../models/ITask";
import {IComment} from "../models/IComment";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  status = new BehaviorSubject<string>('')

  constructor(private http: HttpClient) {
  }

  addTask(boardId: string, data: FormData) {
    return this.http.post<ITask>(`${urls.task}/${boardId}/tasks/`, data, {
      withCredentials: true
    })
  }

  deleteTask(boardId: string, taskId: string) {
    return this.http.delete(`${urls.task}/${boardId}/tasks/${taskId}`, {
      withCredentials: true
    })
  }

  deleteTaskImage(boardId: string, taskId: string) {
    return this.http.delete(`${urls.task}/${boardId}/tasks/${taskId}/img`, {
      withCredentials: true
    })
  }

  editTask(boardId: string, taskId: string, data: FormData) {
    return this.http.patch<{ result: ITask }>(`${urls.task}/${boardId}/tasks/${taskId}`, data, {
      withCredentials: true
    })
  }

  addTaskComment(boardId: string, taskId: string, text: string) {
    return this.http.post<IComment>(`${urls.task}/${boardId}/tasks/${taskId}/comment`, {text}, {
      withCredentials: true
    })
  }

  deleteCommentTask(boardId: string, taskId: string, commentId: string) {
    return this.http.delete(`${urls.task}/${boardId}/tasks/${taskId}/comment/${commentId}`, {
      withCredentials: true
    })
  }

  editCommentTask(boardId: string, taskId: string, comment: IComment) {
    return this.http.patch<{ result: IComment }>(`${urls.task}/${boardId}/tasks/${taskId}/comment/${comment._id}`, comment, {
      withCredentials: true
    })
  }

  archiveTask(boardId: string, taskId: string, isArchived: boolean) {
    return this.http.patch<{ result: ITask }>(`${urls.task}/${boardId}/tasks/${taskId}`, {isArchived}, {
      withCredentials: true
    })
  }


}
