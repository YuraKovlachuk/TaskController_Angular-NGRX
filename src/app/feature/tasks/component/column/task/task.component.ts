import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
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
import {isDeleting} from "../../../../../state/board/board.selectors";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskComponent implements OnInit {
  @Input() task: ITask
  api = environment.URL;


  isImageLoaded = true

  constructor(
    public modalService: ModalService,
    private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  onLoad() {
    this.isImageLoaded = false;
  }

  dragStart(e: any) {
    this.store.dispatch(setTaskID({taskId: this.task._id}))
    e.target.classList.add('invisible')
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
