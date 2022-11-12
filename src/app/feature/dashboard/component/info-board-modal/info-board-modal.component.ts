import {Component, HostListener, Input, OnInit} from '@angular/core';
import {ModalService} from "../../../../services/modal.service";
import {IBoard} from "../../../../models/IBoard";

@Component({
  selector: 'app-info-board-modal',
  templateUrl: './info-board-modal.component.html',
  styleUrls: ['./info-board-modal.component.scss']
})
export class InfoBoardModalComponent implements OnInit {
  @Input() board: IBoard

  constructor(public modalService: ModalService) { }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.modalService.hide(this.modalService.infoModalKey);
    }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
  }

  toggleEdit() {
    this.modalService.show(this.modalService.editModalKey);
    this.modalService.hide(this.modalService.infoModalKey)
  }

}
