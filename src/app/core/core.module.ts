import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './component/header/header.component';
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {DropdownComponent} from "./component/header/dropdown/dropdown.component";
import {ErrorComponent} from "./component/error/error.component";

@NgModule({
  declarations: [
    HeaderComponent,
    DropdownComponent,
    ErrorComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports: [HeaderComponent, ErrorComponent]
})
export class CoreModule { }
