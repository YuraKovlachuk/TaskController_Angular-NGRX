import {Component, OnInit} from '@angular/core';
import {getAllBoardRequest} from "./state/board/board.actions";
import {Store} from "@ngrx/store";
import {AppState} from "./state/app.state";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    if(window.location.pathname.includes('/board')) {
      this.store.dispatch(getAllBoardRequest())
    }
  }
}
