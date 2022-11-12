import {Component, HostListener, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription, take} from "rxjs";
import {ModalService} from "../../../../services/modal.service";
import {ActionsSubject, Store} from "@ngrx/store";
import {AppState} from "../../../../state/app.state";
import {ITask} from "../../../../models/ITask";
import {environment} from "../../../../../environments/environment";
import {deleteTaskImgRequest, editTaskRequest, editTaskSuccess} from "../../../../state/task/task.actions";
import {ofType} from "@ngrx/effects";
import {boardsErrorSelector, isLoadingBoard} from "../../../../state/board/board.selectors";
import {clearError} from "../../../../state/board/board.actions";

@Component({
  selector: 'app-edit-task-modal',
  templateUrl: './edit-task-modal.component.html',
  styleUrls: ['./edit-task-modal.component.scss']
})
export class EditTaskModalComponent implements OnInit {
  @Input() title: string
  @Input() task: ITask
  api = environment.URL;

  form: FormGroup
  error$ = this.store.select(boardsErrorSelector)
  isLoading$ = this.store.select(isLoadingBoard)
  isSuccess: Subscription
  isImageLoaded = true

  url: string | ArrayBuffer | null;
  msg = "";

  constructor(
    public modalService: ModalService,
    private store: Store<AppState>,
    private actionsSubj: ActionsSubject) {
  }

  ngOnInit(): void {
    if(this.task.image) {this.url = this.api + this.task.image}
    this._createForm()
  }

  ngOnDestroy() {
    this.store.dispatch(clearError())
    this.isSuccess?.unsubscribe()
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.modalService.hide(this.modalService.editModalKey);
    }
    // if (event.key === 'Enter') {
    //   this.editTask()
    // }
  }

  get name() {
    return this.form.controls['name'] as FormControl;
  }

  get description() {
    return this.form.controls['description'] as FormControl;
  }

  get image() {
    return this.form.controls['image'] as FormControl;
  }

  get fileSource() {
    return this.form.controls['fileSource'] as FormControl;
  }

  onLoad() {
    this.isImageLoaded = false;
  }

  private _createForm() {
    this.form = new FormGroup({
      name: new FormControl(this.task.name, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(15)
      ]),
      description: new FormControl(this.task.description, [
        Validators.minLength(2),
        Validators.maxLength(150)
      ]),
      status: new FormControl(this.task.status),
      fileSource: new FormControl(this.task.image)
    })
  }

  editTask() {
    let rawValue = this.form.getRawValue()
    if (this.task.name === rawValue.name
      && this.task.description === rawValue.description
      && this.task.status === rawValue.status
      && (this.api + this.task.image) === this.url) {
      this.modalService.hide(this.modalService.editModalKey)
      this.modalService.show(this.modalService.infoModalKey)
      return
    }

    const {boardId, _id: taskId} = this.task

    const formData = new FormData();
    formData.append('name', this.form.get('name')!.value);
    formData.append('description', this.form.get('description')!.value);
    formData.append('image', this.form.get('fileSource')?.value);
    formData.append('status',  this.form.get('status')?.value);

    if(!this.form.get('fileSource')?.value && (this.api + this.task.image) !== this.url) {
      this.store.dispatch(deleteTaskImgRequest({boardId, taskId}))
    }
    this.store.dispatch(editTaskRequest({boardId, taskId, data: formData}))
    this.form.valueChanges.pipe(take(1))
      .subscribe(() => this.store.dispatch(clearError()));
    this.isSuccess = this.actionsSubj.pipe(ofType(editTaskSuccess))
      .subscribe(() => {
        this.modalService.hide(this.modalService.editModalKey)
        this.modalService.show(this.modalService.infoModalKey)
      });
  }

  selectFile(event: any) {
    if(!event.target.files[0] || event.target.files[0].length == 0) {
      this.msg = 'You must select an image';
      return;
    }
    let mimeType = event.target.files[0].type;
    if (mimeType !== 'image/png' &&
      mimeType !== 'image/jpg' &&
      mimeType !== 'image/jpeg' &&
      mimeType !== 'image/gif') {
      this.msg = "Only images(png/jpeg/jpg/gif) are supported";
      return;
    }
    let fileSizeKB = Math.round(event.target.files[0].size / 1024)
    const optimalSize = 1024 * 4
    if(fileSizeKB > optimalSize) {
      this.msg = 'The size of img must be less than 4mb'
      return;
    }
    const file = event.target.files[0];
    this.url = event.target.files[0]
    this.form.patchValue({
      fileSource: file
    });
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      this.msg = "";
      this.url = reader.result;
      // this.form.patchValue({
      //  image: reader.result
      // });
      // // need to run CD since file load runs outside of zone
      // this.cd.markForCheck();
    }
    event.target.value = ''
  }


}
