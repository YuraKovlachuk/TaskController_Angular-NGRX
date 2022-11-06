import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from "./login.component";
import {ReactiveFormsModule} from "@angular/forms";
import {LoginRouterModule} from "./login-router.module";
import {SharedModule} from "../../shared/shared.module";



@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoginRouterModule,
    SharedModule
  ],
  exports: [LoginComponent]
})
export class LoginModule { }
