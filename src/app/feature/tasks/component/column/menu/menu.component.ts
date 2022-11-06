import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModalService} from "../../../../../services/modal.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Output() delete = new EventEmitter()
  @Output() edit = new EventEmitter()
  @Output() archive = new EventEmitter<boolean>()

  @Input() isArchived: boolean

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    let cells = document.querySelectorAll(".menu-container");
    for (let i = 0; i < cells.length; i++) {
      cells[i].addEventListener("mouseover", function (event: any) {
        let menu = event.currentTarget as HTMLDivElement;
        let parent = menu.offsetParent as HTMLDivElement;
        let scroller = parent.lastChild as HTMLDivElement;
        (menu.querySelector('.menu') as HTMLDivElement).style.top =
          (menu.offsetTop + parent.offsetTop - scroller.scrollTop) + "px";
      });
    }
  }

}
