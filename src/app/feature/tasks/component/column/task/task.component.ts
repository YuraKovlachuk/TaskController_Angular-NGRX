import {Component, Input, OnInit} from '@angular/core';
import {ITask} from "../../../../../models/ITask";
import {environment} from "../../../../../../environments/environment";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../../state/app.state";
import {
  archiveTaskRequest,
  deleteTaskRequest,
  editTaskRequest,
  setTaskID
} from "../../../../../state/task/task.actions";
import {ModalService} from "../../../../../services/modal.service";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @Input() task: ITask
  api = environment.URL;

  constructor(
    public modalService: ModalService,
    private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  dragStart(e: any) {
    this.store.dispatch(setTaskID({taskId: this.task._id}))
    e.target.classList.add('invisible')
    e.dataTransfer.setDragImage(e.target, 200, 100);
  }

  dragEnd(e: any) {
      e.target.classList.remove('invisible')
  }

  deleteTask() {
    const {_id: taskId, boardId, status} = this.task
    this.store.dispatch(deleteTaskRequest({taskId, boardId, status}))
  }

  onClick() {
    this.store.dispatch(setTaskID({taskId: this.task._id}))
    this.modalService.show(this.modalService.infoModalKey)
  }

  onEdit() {
    this.store.dispatch(setTaskID({taskId: this.task._id}))
    this.modalService.show(this.modalService.editModalKey)
    this.modalService.hide(this.modalService.archivedModalKey)
  }

  archiveTask() {
    const {boardId, _id: taskId, isArchived} = this.task
    this.store.dispatch(archiveTaskRequest({boardId: boardId, taskId, isArchived: !isArchived}))
  }

}
