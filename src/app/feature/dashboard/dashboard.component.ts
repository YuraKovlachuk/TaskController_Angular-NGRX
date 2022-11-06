import {Component, OnInit} from '@angular/core';
import {AppState} from "../../state/app.state";
import {Store} from "@ngrx/store";
import {boardsSelector} from "../../state/board/board.selectors";
import {deleteBoardRequest, getAllBoardRequest} from "../../state/board/board.actions";
import {IBoard, IBoardCredentials} from "../../models/IBoard";
import {ModalService} from "../../services/modal.service";
import {FilterService} from "../../services/filter.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [ModalService, FilterService]
})
export class DashboardComponent implements OnInit {
  boards: IBoard[]
  boards$ = this.store.select(boardsSelector)
  boardsSub = this.boards$.subscribe(boards => this.boards = boards)
  selectedBoardId: string
  filters = [{value: 'name', name: 'Board name'}, {value: 'tasks.name', name: 'Task name'}]
  sort = [
    {
      label: 'Board', sorts: [
        {value: 'name', name: 'Name'},
        {value: 'createdAt', name: 'Date'},
      ]
    },
    {
      label: 'Task', sorts: [
        {value: 'tasks_count.todo', name: 'Todo'},
        {value: 'tasks_count.progress', name: 'Progress'},
        {value: 'tasks_count.done', name: 'Done'}
      ]
    }
  ]

  constructor(
    private store: Store<AppState>,
    public modalService: ModalService,
    public filterService: FilterService
  ) {
  }

  ngOnInit(): void {
    if (!this.boards?.length) this.store.dispatch(getAllBoardRequest())
  }

  ngOnDestroy() {
    this.boardsSub.unsubscribe()
  }

  deleteBoard(boardId: string) {
    this.store.dispatch(deleteBoardRequest({boardId}))
  }

  findBoardById() {
    return this.boards.find(board => board._id === this.selectedBoardId) as IBoard
  }
}
