import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, of, take} from 'rxjs';
import {AuthService} from "../services/auth.service";
import {catchError, map} from "rxjs/operators";
import {IUser} from "../models/IUser";
import {AppState} from "../state/app.state";
import {Store} from "@ngrx/store";
import {isAuth} from "../state/auth/auth.actions";
import {userSelector} from "../state/auth/auth.selectors";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let checkUser = null
    let sub = this.store.select(userSelector).subscribe(user => {
      checkUser = user
    })
    sub.unsubscribe()
    if (checkUser) {
      return true
    }
    return this.authService.isAuthorized()
      .pipe(
        take(1),
        map((res: IUser) => {
          if (res) {
            this.store.dispatch(isAuth({user: res}))
            return true;
          }
          this.router.navigate(['register'])
          return false;
        }),
        catchError(() => {
          this.router.navigate(['register'])
          return of(false)
        })
      )
  }

}
