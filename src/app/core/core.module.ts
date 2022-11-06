import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './component/header/header.component';
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {DropdownComponent} from "./component/header/dropdown/dropdown.component";

@NgModule({
  declarations: [
    HeaderComponent,
    DropdownComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports: [HeaderComponent]
})
export class CoreModule { }
