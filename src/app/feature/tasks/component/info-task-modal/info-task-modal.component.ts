import {Component, HostListener, Input, OnInit} from '@angular/core';
import {ModalService} from "../../../../services/modal.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ITask} from "../../../../models/ITask";
import {environment} from "../../../../../environments/environment";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../state/app.state";
import {
  addTaskCommentRequest, archiveTaskRequest,
  deleteTaskCommentRequest,
  deleteTaskImgRequest, deleteTaskRequest, deleteTaskSuccess, editTaskCommentRequest,
  editTaskRequest, editTaskSuccess
} from "../../../../state/task/task.actions";
import {userSelector} from "../../../../state/auth/auth.selectors";
import {take} from "rxjs";
import {clearError} from "../../../../state/board/board.actions";
import {IComment} from "../../../../models/IComment";
import {ofType} from "@ngrx/effects";

@Component({
  selector: 'app-info-task-modal',
  templateUrl: './info-task-modal.component.html',
  styleUrls: ['./info-task-modal.component.scss']
})
export class InfoTaskModalComponent implements OnInit {
  @Input() task: ITask

  form: FormGroup
  api = environment.URL;
  isEditing = false

  user$ = this.store.select(userSelector);

  constructor(
    public modalService: ModalService,
    private store: Store<AppState>) {
    this._createForm()
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.modalService.hide(this.modalService.infoModalKey);
    }
  }

  ngOnInit(): void {
  }

  get comment() {
    return this.form.controls['comment'] as FormControl;
  }

  private _createForm() {
    this.form = new FormGroup({
      comment: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ])
    })
  }

  uploadImage(event: any) {
    const {boardId, _id: taskId} = this.task
    if(!event.target.files[0] || event.target.files[0].length == 0) {
      return;
    }
    let mimeType = event.target.files[0].type;
    if (mimeType !== 'image/png' &&
      mimeType !== 'image/jpg' &&
      mimeType !== 'image/jpeg' &&
      mimeType !== 'image/gif') {
      return;
    }
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    this.store.dispatch(editTaskRequest({boardId, taskId, data: formData}))
  }

  changeName(newName: string) {
    this.isEditing = false
    if(newName.length < 2 || newName.length > 15 || newName === this.task.name) {
      return
    }


    const {boardId, _id: taskId} = this.task
    const formData = new FormData();
    formData.append('name', newName);
    this.store.dispatch(editTaskRequest({boardId, taskId, data: formData}))
  }

  clickOnTitle() {
    this.isEditing = !this.isEditing;
  }

  deleteTaskImg() {
    const {boardId, _id: taskId} = this.task
    this.store.dispatch(deleteTaskImgRequest({boardId, taskId}))
  }

  toggleEdit() {
    this.modalService.hide(this.modalService.infoModalKey)
    this.modalService.show(this.modalService.editModalKey)
  }

  archiveTask() {
    const {boardId, _id: taskId, isArchived} = this.task
    this.store.dispatch(archiveTaskRequest({boardId: boardId, taskId, isArchived: !isArchived}))
  }

  deleteTask() {
    const {_id: taskId, boardId, status} = this.task
    this.store.dispatch(deleteTaskRequest({taskId, boardId, status}))
    this.modalService.hide(this.modalService.infoModalKey)
  }

  addComment() {
    const rawValue: {comment: string} = this.form.getRawValue()
    const {boardId, _id: taskId} = this.task
    this.form.reset();
    this.store.dispatch(addTaskCommentRequest({boardId, taskId, text: rawValue.comment}))
    this.form.valueChanges.pipe(take(1))
      .subscribe(() => this.store.dispatch(clearError()));
  }

  deleteComment(commentId : string) {
    const {boardId, _id: taskId} = this.task
    this.store.dispatch(deleteTaskCommentRequest({boardId, taskId, commentId}))
  }

  editComment(comment: {_id: string, text: string, isEdited:boolean}) {
    const {boardId, _id: taskId} = this.task
    this.store.dispatch(editTaskCommentRequest({boardId, taskId, comment: comment as IComment}))
  }



}
