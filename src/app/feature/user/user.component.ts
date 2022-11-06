import { Component, OnInit } from '@angular/core';
import {userSelector} from "../../state/auth/auth.selectors";
import {Store} from "@ngrx/store";
import {AppState} from "../../state/app.state";
import {ModalService} from "../../services/modal.service";
import {deleteUserRequset} from "../../state/user/user.actions";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [ModalService]
})
export class UserComponent implements OnInit {
  user$ = this.store.select(userSelector);

  constructor(
    private store: Store<AppState>,
    public modalService: ModalService) { }

  ngOnInit(): void {
  }

  deleteUser() {
    this.store.dispatch(deleteUserRequset())
  }

}
