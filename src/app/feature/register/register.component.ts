import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Subscription, take, takeUntil} from "rxjs";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {AppState} from "../../state/app.state";
import {clearError, registerRequest} from "../../state/auth/auth.actions";
import {authErrorSelector, isLoadingAuth} from "../../state/auth/auth.selectors";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  error$ = this.store.select(authErrorSelector)
  isLoading$ = this.store.select(isLoadingAuth)

  constructor(
    public router: Router,
    public store: Store<AppState>
  ) { this._createForm() }

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

  get confirmPass() {
    return this.form.controls['confirmPass'] as FormControl;
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
      confirmPass: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20)
      ])
    }, [this._checkPasswords])
  }

  registerUser() {
    const rawValue = this.form.getRawValue();
    delete rawValue.confirmPass
    this.store.dispatch(registerRequest({credential: rawValue}));
    this.form.reset();
    this.form.valueChanges.pipe(take(1), takeUntil(this.error$))
      .subscribe(() => this.store.dispatch(clearError()));
  }

  private _checkPasswords(form: AbstractControl): ValidationErrors | null {
    const password = form.get('password');
    const confirmPass = form.get('confirmPass');
    return password?.value === confirmPass?.value ? null : {notSamePass: 'Password and Confirm Password must be match'}
  }

}
