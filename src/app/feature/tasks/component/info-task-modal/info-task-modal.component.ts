import {Component, HostListener, Input, OnInit} from '@angular/core';
import {ModalService} from "../../../../services/modal.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ITask} from "../../../../models/ITask";
import {environment} from "../../../../../environments/environment";
import {ActionsSubject, Store} from "@ngrx/store";
import {AppState} from "../../../../state/app.state";
import {
  addTaskCommentRequest, archiveTaskRequest,
  deleteTaskCommentRequest,
  deleteTaskImgRequest, deleteTaskRequest, deleteTaskSuccess, editTaskCommentRequest,
  editTaskRequest, editTaskSuccess
} from "../../../../state/task/task.actions";
import {userSelector} from "../../../../state/auth/auth.selectors";
import {Subscription, take} from "rxjs";
import {addBoardSuccess, clearError} from "../../../../state/board/board.actions";
import {IComment} from "../../../../models/IComment";
import {ofType} from "@ngrx/effects";
import {isArchiving, isCommentLoading, isDeleting, isLoadingBoard} from "../../../../state/board/board.selectors";

@Component({
  selector: 'app-info-task-modal',
  templateUrl: './info-task-modal.component.html',
  styleUrls: ['./info-task-modal.component.scss']
})
export class InfoTaskModalComponent implements OnInit {
  @Input() task: ITask

  taskName: string
  form: FormGroup
  api = environment.URL;
  isEditing = false
  isSuccess: Subscription

  user$ = this.store.select(userSelector);
  isDeleting$ = this.store.select(isDeleting)
  isLoading$ = this.store.select(isLoadingBoard)
  isArchiving$ = this.store.select(isArchiving)
  isCommentLoading$ = this.store.select(isCommentLoading)
  isImageLoaded = true;

  constructor(
    public modalService: ModalService,
    private store: Store<AppState>,
    private actionsSubj: ActionsSubject) {
    this._createForm()
  }

  onLoad() {
    this.isImageLoaded = false;
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.modalService.hide(this.modalService.infoModalKey);
    }
  }

  ngOnInit(): void {
    this.taskName = this.task.name
  }

  reverseComments(): IComment[] {
    const {comments} = this.task
    return comments.length ? [...comments].reverse() : comments
  }

  ngOnDestroy() {
    this.isSuccess?.unsubscribe()
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
    let fileSizeKB = Math.round(event.target.files[0].size / 1024)
    const optimalSize = 1024 * 4
    if(fileSizeKB > optimalSize) {
      return;
    }
    this.isImageLoaded = true;
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
    this.taskName = newName;
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
    this.isSuccess = this.actionsSubj.pipe(ofType(deleteTaskSuccess))
      .subscribe(() => this.modalService.hide(this.modalService.infoModalKey));
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
