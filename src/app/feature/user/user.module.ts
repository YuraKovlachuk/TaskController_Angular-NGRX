import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserInfoComponent } from './component/user-info/user-info.component';
import { ChangeUsernameComponent } from './component/change-username/change-username.component';
import { ChangePasswordComponent } from './component/change-password/change-password.component';
import { ChangeAvatarModalComponent } from './component/change-avatar-modal/change-avatar-modal.component';
import {SharedModule} from "../../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    UserComponent,
    UserInfoComponent,
    ChangeUsernameComponent,
    ChangePasswordComponent,
    ChangeAvatarModalComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [UserComponent]
})
export class UserModule { }
