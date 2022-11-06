import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ITask} from "../../../../models/ITask";
import {ModalService} from "../../../../services/modal.service";
import {TaskService} from "../../../../services/task.service";
import {FilterService} from "../../../../services/filter.service";
import {taskSelectById} from "../../../../state/board/board.selectors";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../state/app.state";
import {editTaskRequest} from "../../../../state/task/task.actions";
import {debounceTime, distinctUntilChanged, fromEvent, Subscription} from "rxjs";
import {map} from "rxjs/operators";
import {editBoardRequest, editColumnColorRequest} from "../../../../state/board/board.actions";
import {IBoard} from "../../../../models/IBoard";

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent implements OnInit {
  @Input() boardId: string
  @Input() name: string
  @Input() tasks: ITask[]
  @Input() inputColor: string
  @Input() color: string

  @ViewChild("colorInput", {static: true}) colorInput: ElementRef;
  eventSubscribe: Subscription

  constructor(
    public modalService: ModalService,
    public taskService: TaskService,
    public filterService: FilterService,
    private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.eventSubscribe = fromEvent<InputEvent>(this.colorInput.nativeElement, "input").pipe(
      map((e) => {
        const input = e.target as HTMLInputElement
        this.color = input.value
        console.log(input.value)
        return input.value
      }),
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe((value) => {
      this.store.dispatch(editColumnColorRequest({boardId: this.boardId, color: value, column: this.name.toLowerCase()}))
    })
  }

  ngOnDestroy() {
    this.eventSubscribe.unsubscribe()
  }

  // dragOver (e: any) {
  //   e.preventDefault()
  // }
  //
  // dragEnter (e: any) {
  //   e.preventDefault()
  // }
  //
  // dragLeave (e: any) {
  //   e.preventDefault()
  // }

  dragDrop () {
    const formData = new FormData();
    formData.append('status', this.name.toUpperCase());
    const sub = this.store.select(taskSelectById).subscribe(task => {
      if(task.status === this.name.toUpperCase()) {return}
      this.store.dispatch(editTaskRequest({boardId: this.boardId, taskId: task._id, data: formData}))
    })
    sub.unsubscribe()
  }

  onClick() {
    this.modalService.show(this.modalService.createModalKey)
    this.taskService.status.next(this.name.toUpperCase())
  }

  onChangeColor() {

  }
}
