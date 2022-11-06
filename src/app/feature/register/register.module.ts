import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RegisterComponent} from "./register.component";
import {ReactiveFormsModule} from "@angular/forms";
import {RegisterRouterModule} from "./register-router.module";
import {SharedModule} from "../../shared/shared.module";



@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RegisterRouterModule,
    SharedModule
  ],
  exports: [RegisterComponent]
})
export class RegisterModule { }
