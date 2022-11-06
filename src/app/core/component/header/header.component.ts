import { Component, OnInit } from '@angular/core';
import {AppState} from "../../../state/app.state";
import {Store} from "@ngrx/store";
import {userSelector} from "../../../state/auth/auth.selectors";
import {IUser} from "../../../models/IUser";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: IUser | null;
  user$ = this.store.select(userSelector);
  userSub = this.user$.subscribe(user => this.user = user);
  api = environment.URL;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.userSub.unsubscribe()
  }
}
