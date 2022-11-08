import {Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';
import {IBoard} from "../../../../models/IBoard";
import {ModalService} from "../../../../services/modal.service";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  @Input() board: IBoard
  @Output() boardIdEvent = new EventEmitter<string>;
  @Output() deleteIdEvent = new EventEmitter<string>;

  constructor(
    private svgImageRef: ElementRef<HTMLDivElement>,
    public modalService: ModalService) { }


  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    this.svgImageRef.nativeElement.style.setProperty('--my-color-var', this.board.color);
  }

}