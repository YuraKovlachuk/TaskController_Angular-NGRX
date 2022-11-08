import {ChangeDetectorRef, Component, HostListener, Input, OnInit} from '@angular/core';
import {ModalService} from "../../../../services/modal.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActionsSubject, Store} from "@ngrx/store";
import {AppState} from "../../../../state/app.state";
import {TaskService} from "../../../../services/task.service";
import {Subscription, take} from "rxjs";
import {ofType} from "@ngrx/effects";
import {addTaskRequest, addTaskSuccess} from "../../../../state/task/task.actions";
import {boardsErrorSelector, isLoadingBoard} from "../../../../state/board/board.selectors";
import {clearError} from "../../../../state/board/board.actions";

@Component({
  selector: 'app-create-task-modal',
  templateUrl: './create-task-modal.component.html',
  styleUrls: ['./create-task-modal.component.scss']
})
export class CreateTaskModalComponent implements OnInit {
  @Input() title: string
  @Input() boardId: string

  form: FormGroup
  error$ = this.store.select(boardsErrorSelector)
  isLoading$ = this.store.select(isLoadingBoard)
  isSuccess: Subscription
  isImageLoading = true

  url: string | ArrayBuffer | null;
  msg = "";

  status: string
  statusSub = this.taskService.status.subscribe(status => this.status = status)

  constructor(
    public modalService: ModalService,
    private store: Store<AppState>,
    private cd: ChangeDetectorRef,
    public taskService: TaskService,
    private actionsSubj: ActionsSubject) {
    this._createForm()
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.store.dispatch(clearError())
    this.isSuccess?.unsubscribe()
    this.statusSub.unsubscribe()
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.modalService.hide(this.modalService.createModalKey);
    }
    // if (event.key === 'Enter') {
    //   this.addTask()
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
    this.isImageLoading = false;
  }

  private _createForm() {
    this.form = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(15)
      ]),
      description: new FormControl('', [
        Validators.minLength(2),
        Validators.maxLength(150)
      ]),
      image: new FormControl(null),
      fileSource: new FormControl('')
    })
  }

  addTask() {
    const formData = new FormData();
    formData.append('name', this.form.get('name')!.value);
    formData.append('description', this.form.get('description')!.value);
    formData.append('image', this.form.get('fileSource')?.value);
    formData.append('status', this.status);

    this.store.dispatch(addTaskRequest({boardId: this.boardId, data: formData}))
    this.form.reset();
    this.form.valueChanges.pipe(take(1))
      .subscribe(() => this.store.dispatch(clearError()));

    this.isSuccess = this.actionsSubj.pipe(ofType(addTaskSuccess))
      .subscribe(() => this.modalService.hide(this.modalService.createModalKey));
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
