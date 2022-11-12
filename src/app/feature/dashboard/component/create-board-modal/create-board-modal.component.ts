import {Component, HostListener, Input, OnInit} from '@angular/core';
import {ModalService} from "../../../../services/modal.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActionsSubject, Store} from "@ngrx/store";
import {AppState} from "../../../../state/app.state";
import {addBoardRequest, addBoardSuccess, clearError} from "../../../../state/board/board.actions";
import {boardsErrorSelector, isLoadingBoard} from "../../../../state/board/board.selectors";
import {Subscription, take} from "rxjs";
import {ofType} from "@ngrx/effects";

@Component({
  selector: 'app-create-board-modal',
  templateUrl: './create-board-modal.component.html',
  styleUrls: ['./create-board-modal.component.scss']
})
export class CreateBoardModalComponent implements OnInit {
  @Input() title: string;
  form: FormGroup;
  error$ = this.store.select(boardsErrorSelector)
  isLoading$ = this.store.select(isLoadingBoard)
  isSuccess: Subscription

  constructor(
    public modalService: ModalService,
    private store: Store<AppState>,
    private actionsSubj: ActionsSubject) {
    this._createForm()
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.modalService.hide(this.modalService.createModalKey);
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.isSuccess?.unsubscribe()
    this.store.dispatch(clearError());
  }

  get name() {
    return this.form.controls['name'] as FormControl;
  }

  get description() {
    return this.form.controls['description'] as FormControl;
  }

  get color() {
    return this.form.controls['color'] as FormControl;
  }

  private _createForm() {
    this.form = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(15)
      ]),
      description: new FormControl(null, [
        Validators.minLength(2),
        Validators.maxLength(50)
      ]),
      color: new FormControl('#6356E5')
    })
  }

  public addBoard() {
    this.store.dispatch(addBoardRequest({board: this.form.getRawValue()}));
    this.form.reset();
    this.color.setValue('#6356E5')
    this.form.valueChanges.pipe(take(1))
      .subscribe(() => this.store.dispatch(clearError()));

    this.isSuccess = this.actionsSubj.pipe(ofType(addBoardSuccess))
      .subscribe(() => this.modalService.hide(this.modalService.createModalKey));
  }

}
