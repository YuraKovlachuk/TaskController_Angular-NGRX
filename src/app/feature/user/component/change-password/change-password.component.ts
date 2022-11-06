import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../../../state/app.state";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {authSuccessSelector, passwordErrorSelector} from "../../../../state/auth/auth.selectors";
import {take} from "rxjs";
import {clearError} from "../../../../state/auth/auth.actions";
import {clearSuccessMessage, editPasswordRequest} from "../../../../state/user/user.actions";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  form: FormGroup;
  error$ = this.store.select(passwordErrorSelector)
  success$ = this.store.select(authSuccessSelector)
  isEditing = false


  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this._createForm()
  }

  ngOnDestroy() {
    this.store.dispatch(clearSuccessMessage())
    this.store.dispatch(clearError())
  }

  get oldPassword() {
    return this.form.controls['oldPassword'] as FormControl;
  }

  get newPassword() {
    return this.form.controls['newPassword'] as FormControl;
  }

  private _createForm() {
    this.form = new FormGroup({
      oldPassword: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20)
      ]),
      newPassword: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20)
      ])
    })
  }

  changePassword() {
    let {oldPassword, newPassword} = this.form.getRawValue()

    if(oldPassword === newPassword) { return }

    this.store.dispatch(editPasswordRequest({oldPassword, newPassword}))

    this.form.valueChanges.pipe(take(1))
      .subscribe(() => {
        this.store.dispatch(clearSuccessMessage())
        this.store.dispatch(clearError()
        )})

  }
}
