import {Component, HostListener, Input, OnInit} from '@angular/core';
import {ModalService} from "../../../../services/modal.service";
import {ITask} from "../../../../models/ITask";

@Component({
  selector: 'app-archived-list-modal',
  templateUrl: './archived-list-modal.component.html',
  styleUrls: ['./archived-list-modal.component.scss']
})
export class ArchivedListModalComponent implements OnInit {
  @Input() archivedTasks: ITask[]
  @Input() title: string

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.modalService.hide(this.modalService.archivedModalKey);
    }
  }

  constructor(public modalService: ModalService) { }

  ngOnInit(): void {
  }

}
