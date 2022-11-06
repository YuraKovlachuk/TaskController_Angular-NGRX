import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BoardComponent} from "./component/board/board.component";
import {CreateBoardComponent} from "./component/create-board/create-board.component";
import {DashboardComponent} from "./dashboard.component";
import {SharedModule} from "../../shared/shared.module";
import {CreateBoardModalComponent} from "./component/create-board-modal/create-board-modal.component";
import {ReactiveFormsModule} from "@angular/forms";
import {InfoBoardModalComponent} from "./component/info-board-modal/info-board-modal.component";
import {EditBoardModalComponent} from "./component/edit-board-modal/edit-board-modal.component";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    BoardComponent,
    CreateBoardComponent,
    DashboardComponent,
    CreateBoardModalComponent,
    InfoBoardModalComponent,
    EditBoardModalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule
  ],
    exports: [DashboardComponent, EditBoardModalComponent]
})
export class DashboardModule { }
