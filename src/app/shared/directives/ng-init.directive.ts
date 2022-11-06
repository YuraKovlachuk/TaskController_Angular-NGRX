import {Directive, EventEmitter, OnInit, Output} from '@angular/core';

@Directive({
  selector: '[ngInit]'
})
export class NgInitDirective implements OnInit{
  @Output() onInit = new EventEmitter<void>();

  ngOnInit(): void {
    this.onInit.emit();
  }

}
