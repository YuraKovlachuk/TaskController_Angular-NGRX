import {Component, HostListener, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {boardsErrorSelector, isLoadingBoard} from "../../../../state/board/board.selectors";
import {IBoard} from "../../../../models/IBoard";
import {ModalService} from "../../../../services/modal.service";
import {ActionsSubject, Store} from "@ngrx/store";
import {AppState} from "../../../../state/app.state";
import {clearError, editBoardRequest, editBoardSuccess} from "../../../../state/board/board.actions";
import {Subscription, take} from "rxjs";
import {ofType} from "@ngrx/effects";

@Component({
  selector: 'app-edit-board-modal',
  templateUrl: './edit-board-modal.component.html',
  styleUrls: ['./edit-board-modal.component.scss']
})
export class EditBoardModalComponent implements OnInit {
  @Input() title: string;
  @Input() board: IBoard;
  form: FormGroup;
  error$ = this.store.select(boardsErrorSelector)
  isLoading$ = this.store.select(isLoadingBoard)
  isSuccess: Subscription

  constructor(
    public modalService: ModalService,
    private store: Store<AppState>,
    private actionsSubj: ActionsSubject) {
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.modalService.hide(this.modalService.editModalKey);
    }
  }

  ngOnInit(): void {
    this._createForm()
  }

  ngOnDestroy() {
    this.isSuccess?.unsubscribe()
    this.store.dispatch(clearError());
  }

  get name() {
    return this.form.controls['name'] as FormControl;
  }

  get color() {
    return this.form.controls['color'] as FormControl;
  }

  private _createForm() {
    this.form = new FormGroup({
      name: new FormControl(this.board.name, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(15)
      ]),
      color: new FormControl(this.board.color)
    })
  }


  editBoard() {
    let rawValue = this.form.getRawValue()
    rawValue._id = this.board._id
    if (this.board.name === rawValue.name
      && this.board.color.toUpperCase() === rawValue.color.toUpperCase()) {
      this.modalService.hide(this.modalService.editModalKey)
      this.modalService.show(this.modalService.infoModalKey)
      return
    }

    this.store.dispatch(editBoardRequest({board: rawValue}));
    this.form.valueChanges.pipe(take(1))
      .subscribe(() => this.store.dispatch(clearError()));
    this.isSuccess = this.actionsSubj.pipe(ofType(editBoardSuccess))
      .subscribe(() => {
        this.modalService.hide(this.modalService.editModalKey)
        this.modalService.show(this.modalService.infoModalKey)});
  }

  // private resetForm() {
  //   this.form.reset()
  //   this.name.setValue(this.board.name)
  //   this.color.setValue(this.board.color)
  // }
}
