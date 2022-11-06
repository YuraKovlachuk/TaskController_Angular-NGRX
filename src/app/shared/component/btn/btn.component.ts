import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-btn',
  templateUrl: './btn.component.html',
  styleUrls: ['./btn.component.scss']
})
export class BtnComponent implements OnInit {
  @Input() title: string
  @Input() class: string
  @Input() type: string

  constructor() { }

  ngOnInit(): void {
  }

}
