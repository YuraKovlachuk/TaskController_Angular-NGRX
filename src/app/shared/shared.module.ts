import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterBarComponent } from './component/filter-bar/filter-bar.component';
import {DropdownDirective} from "./directives/dropdown.directive";
import { FormInputComponent } from './component/form-input/form-input.component';
import { FormButtonComponent } from './component/form-button/form-button.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ModalService} from "../services/modal.service";
import {BtnComponent} from "./component/btn/btn.component";
import {FilterPipe} from "./pipes/filter.pipe";
import {OrderByPipe} from "./pipes/order-by.pipe";
import { NgInitDirective } from './directives/ng-init.directive';
import { FocusedDirective } from './directives/focused.directive';
import { SpinnerComponent } from './component/spinner/spinner.component';

@NgModule({
  declarations: [
    FilterBarComponent,
    DropdownDirective,
    FormInputComponent,
    FormButtonComponent,
    BtnComponent,
    FilterPipe,
    OrderByPipe,
    NgInitDirective,
    FocusedDirective,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [ModalService],
    exports: [
        FilterBarComponent,
        DropdownDirective,
        FormButtonComponent,
        FormInputComponent,
        BtnComponent,
        FilterPipe,
        OrderByPipe,
        NgInitDirective,
        FocusedDirective,
        SpinnerComponent
    ]
})
export class SharedModule { }
