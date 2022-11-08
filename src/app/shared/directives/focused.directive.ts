import {Directive, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[appFocused]'
})
export class FocusedDirective {
  @Output() focused = new EventEmitter<void>();

  constructor() { }

  @HostListener('keydown.enter', ['$event.target'])
  handleKeyboardEvent(event: KeyboardEvent): void {
     this.focused.emit()
  }

}
