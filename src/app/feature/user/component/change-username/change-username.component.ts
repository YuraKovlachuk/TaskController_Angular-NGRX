import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {authErrorSelector, usernameErrorSelector} from "../../../../state/auth/auth.selectors";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../state/app.state";
import {take} from "rxjs";
import {clearError} from "../../../../state/auth/auth.actions";
import {IUser} from "../../../../models/IUser";
import {editUsernameRequest} from "../../../../state/user/user.actions";

@Component({
  selector: 'app-change-username',
  templateUrl: './change-username.component.html',
  styleUrls: ['./change-username.component.scss']
})
export class ChangeUsernameComponent implements OnInit {
  @Input() user: IUser
  form: FormGroup;
  error$ = this.store.select(usernameErrorSelector)
  isEditing = false

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this._createForm()
  }

  get username() {
    return this.form.controls['username'] as FormControl;
  }

  private _createForm() {
    this.form = new FormGroup({
      username: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(15)
      ])
    })
  }

  changeUsername() {
    let rawValue = this.form.getRawValue()
    if(this.user.username === rawValue.username) {
      return
    }
    this.store.dispatch(editUsernameRequest({username: rawValue.username}))

    this.form.valueChanges.pipe(take(1))
      .subscribe(() => this.store.dispatch(clearError()));
  }

}
