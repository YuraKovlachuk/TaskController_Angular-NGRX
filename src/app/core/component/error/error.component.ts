import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../../state/app.state";
import {getAllBoardsError} from "../../../state/board/board.selectors";
import {clearError} from "../../../state/board/board.actions";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  error$ = this.store.select(getAllBoardsError)

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  closeError() {
    this.store.dispatch(clearError())
  }

}
