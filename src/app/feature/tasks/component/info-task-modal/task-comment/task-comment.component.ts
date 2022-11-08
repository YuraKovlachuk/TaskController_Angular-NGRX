import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IComment} from "../../../../../models/IComment";
import {environment} from "../../../../../../environments/environment";
import {IUser} from "../../../../../models/IUser";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../../state/app.state";
import {isCommentDeleting} from "../../../../../state/board/board.selectors";

@Component({
  selector: 'app-task-comment',
  templateUrl: './task-comment.component.html',
  styleUrls: ['./task-comment.component.scss']
})
export class TaskCommentComponent implements OnInit {
  @Input() comment: IComment
  @Input() user: IUser

  @Output()  delete = new EventEmitter<string>()
  @Output()  edit = new EventEmitter<{_id: string, text: string, isEdited: boolean}>()

  isEditing = false
  newText: string
  commentText: string
  api = environment.URL;

  isDeleting$ = this.store.select(isCommentDeleting)

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.commentText = this.comment.text
  }

  getDaysInMonth(year: number, month: number) {
    return new Date(year, month, 0).getDate();
  }

  getMinutesBetweenDates() {
    const date = new Date();
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth() + 1;
    const monthDays = this.getDaysInMonth(currentYear, currentMonth)

    let diff = date.getTime() - new Date(this.comment.createdAt).getTime();
    let minutes: number = Math.round(diff / 60000)
    let hours = Math.round(minutes / 60)
    let days = Math.round(hours / 24)
    let months = Math.round(days / monthDays)

    if(days > monthDays) {
      return `${months} months ago`
    }
    if(hours > 24) {
      return `${days} days ago`
    }
    if(minutes > 60) {
      return `${hours} hours ago`
    }
    return `${minutes} minutes ago`;
  }

  submitEdit() {
    this.isEditing = !this.isEditing
    if(this.newText === this.comment.text ||
      this.newText.length < 2 ||
      this.newText.length > 120) {return}
    this.commentText = this.newText
    this.edit.emit({_id: this.comment._id, text: this.newText, isEdited: true})
  }

  submitDelete() {
    if(this.isEditing) {
      this.isEditing = false
      return
    }
    this.delete.emit(this.comment._id)
  }
}
