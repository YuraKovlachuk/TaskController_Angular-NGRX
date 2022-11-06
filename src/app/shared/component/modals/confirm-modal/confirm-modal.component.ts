import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {ModalService} from "../../../../services/modal.service";
import {FormGroup} from "@angular/forms";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({opacity:0}),
        animate(100, style({opacity:1})),
      ]),
      transition(':leave', [
        animate(100, style({opacity:0}))
      ])
    ])
  ]
})
export class ConfirmModalComponent implements OnInit {
  @Input() title: string;
  @Input() modalKey: string
  @Output() choose = new EventEmitter<boolean>;

  constructor(public modalService: ModalService) { }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.choose.emit(false)
      this.modalService.hide(this.modalKey);
    }
    if(event.key === 'Enter') {
      this.onClick()
    }
  }

  onClick() {
    this.choose.emit(true)
    this.modalService.hide(this.modalKey);
  }

  ngOnInit(): void {
  }

}
