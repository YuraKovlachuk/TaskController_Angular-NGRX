import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../../shared/shared.module";
import {TasksComponent} from "./tasks.component";
import {TasksRouterModule} from './tasks-router.module';
import {ColumnComponent} from "./component/column/column.component";
import {CreateTasksComponent} from "./component/column/create-tasks/create-tasks.component";
import {TaskComponent} from "./component/column/task/task.component";
import {CreateTaskModalComponent} from "./component/create-task-modal/create-task-modal.component";
import {ReactiveFormsModule} from "@angular/forms";
import {MenuComponent} from "./component/column/menu/menu.component";
import {InfoTaskModalComponent} from "./component/info-task-modal/info-task-modal.component";
import {EditTaskModalComponent} from "./component/edit-task-modal/edit-task-modal.component";
import {TaskCommentComponent} from "./component/info-task-modal/task-comment/task-comment.component";
import {ArchivedListModalComponent} from "./component/archived-list-modal/archived-list-modal.component";


@NgModule({
  declarations: [
    TasksComponent,
    ColumnComponent,
    CreateTasksComponent,
    TaskComponent,
    CreateTaskModalComponent,
    MenuComponent,
    InfoTaskModalComponent,
    EditTaskModalComponent,
    TaskCommentComponent,
    ArchivedListModalComponent],
  imports: [
    CommonModule,
    SharedModule,
    TasksRouterModule,
    ReactiveFormsModule
  ],
  exports: [TasksComponent]
})
export class TasksModule { }
