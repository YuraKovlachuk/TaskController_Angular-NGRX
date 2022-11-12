import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {take, takeUntil} from "rxjs";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {AppState} from "../../state/app.state";
import {clearError, loginRequest} from "../../state/auth/auth.actions";
import {authErrorSelector, isLoadingAuth} from "../../state/auth/auth.selectors";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  error$ = this.store.select(authErrorSelector)
  isLoading$ = this.store.select(isLoadingAuth)

  constructor(
    private router: Router,
    private store: Store<AppState>
  ) {
    this._createForm()
  }

  ngOnInit(): void {
    document.body.classList.add('auth-body');
  }

  ngOnDestroy() {
    this.store.dispatch(clearError());
    document.body.classList.remove('auth-body');
  }

  get username() {
    return this.form.controls['username'] as FormControl;
  }

  get password() {
    return this.form.controls['password'] as FormControl;
  }

  private _createForm() {
    this.form = new FormGroup({
      username: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(15)
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20)
      ]),
    })
  }

  loginUser() {
    this.store.dispatch(loginRequest({credential: this.form.getRawValue()}));
    this.form.reset();
    this.form.valueChanges.pipe(take(1), takeUntil(this.error$))
      .subscribe(() => this.store.dispatch(clearError()));
  }
}
