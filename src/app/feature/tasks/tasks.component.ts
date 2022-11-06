import {Component, OnInit} from '@angular/core';
import {IBoard} from "../../models/IBoard";
import {Store} from "@ngrx/store";
import {AppState} from "../../state/app.state";
import {boardSelectById, taskSelectById} from "../../state/board/board.selectors";
import {ActivatedRoute, Router} from "@angular/router";
import {ITask} from "../../models/ITask";
import {ModalService} from "../../services/modal.service";
import {Title} from "@angular/platform-browser";
import {FilterService} from "../../services/filter.service";
import {setBoardId} from "../../state/board/board.actions";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  providers: [ModalService, FilterService]
})
export class TasksComponent implements OnInit {
  filters = [{value: 'name', name: 'Task name'}]
  sort = [
    {
      label: 'Task', sorts: [
        {value: 'name', name: 'Name'},
        {value: 'createdAt', name: 'Date'}
      ]
    }
  ]
  board: IBoard
  board$ = this.store.select(boardSelectById(this.activatedRoute.snapshot.paramMap.get("id") as string))
  boardSub = this.board$.subscribe(board => this.board = board)

  task$ = this.store.select(taskSelectById)

  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    public modalService: ModalService,
    private titleService: Title)
  {
    this.titleService.setTitle(this.board.name + ' - CTask');
  }

  ngOnInit(): void {
    this.store.dispatch(setBoardId({boardId: this.board._id}))
  }

  ngOnDestroy() {
    this.boardSub.unsubscribe()
  }

  getTaskByStatus(status: string) {
    const result: ITask[] = []
    this.board.tasks.forEach(task => {
      if(task.status === status && !task.isArchived) {
        result.push(task)
      }
    })
    return result
  }

  getArchivedTasks() {
    const result: ITask[] = []
    this.board.tasks.forEach(task => {
      if(task.isArchived) {
        result.push(task)
      }
    })
    return result
  }

}
