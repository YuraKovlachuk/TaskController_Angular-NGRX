import {Component, Input, OnInit} from '@angular/core';
import {AppState} from "../../../../state/app.state";
import {Store} from "@ngrx/store";
import {logout} from "../../../../state/auth/auth.actions";

@Component({
  selector: 'header-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
  @Input() title: string
  isMenuOpened: boolean = false;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
  }

  toggleMenu(): void {
    this.isMenuOpened = !this.isMenuOpened;
  }

  clickedOutside(): void {
    this.isMenuOpened = false;
  }

  logout() {
    this.store.dispatch(logout())
  }

}
