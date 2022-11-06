import {Component, Input, OnInit} from '@angular/core';
import {ControlContainer, FormControl, FormGroupDirective} from "@angular/forms";
import {Observable} from "rxjs";

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
  viewProviders: [
  {
    provide: ControlContainer,
    useExisting: FormGroupDirective
  }
]
})
export class FormInputComponent implements OnInit {
  @Input() controlName: string
  @Input() control: FormControl
  @Input() label: string
  @Input() placeholder: string
  @Input() name: string
  @Input() type: string
  @Input() error$: Observable<string>
  @Input() withError: boolean
  @Input() defaultValue?: string
  @Input() newHeight: string

  constructor() { }

  ngOnInit(): void {
  }



}
