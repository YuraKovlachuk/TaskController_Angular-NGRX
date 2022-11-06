import {Component, Input, OnInit} from '@angular/core';
import {ModalService} from "../../../../services/modal.service";
import {IUser} from "../../../../models/IUser";
import {environment} from "../../../../../environments/environment";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../state/app.state";
import {deleteUserAvatarRequest, uploadUserAvatarRequest} from "../../../../state/user/user.actions";
import {authErrorSelector} from "../../../../state/auth/auth.selectors";
import {clearError} from "../../../../state/auth/auth.actions";

@Component({
  selector: 'app-change-avatar-modal',
  templateUrl: './change-avatar-modal.component.html',
  styleUrls: ['./change-avatar-modal.component.scss']
})
export class ChangeAvatarModalComponent implements OnInit {
  @Input() user: IUser;
  error$ = this.store.select(authErrorSelector)
  defaultAvatar = 'img\\default-avatar.png'
  api = environment.URL;
  url: string | ArrayBuffer | null;
  file: any;
  msg = "";

  constructor(
    public modalService: ModalService,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    if(this.user.avatar) {this.url = this.api + this.user.avatar}
  }

  uploadAvatar() {
    this.store.dispatch(clearError())
    if(this.url === this.file) {return}
    const formData = new FormData();
    formData.append('avatar', this.file);
    this.store.dispatch(uploadUserAvatarRequest({data: formData}))
  }

  removeAvatar() {
    this.store.dispatch(clearError())
    if(this.user.avatar === this.defaultAvatar) {
      this.url = this.api + this.defaultAvatar
      return
    }
    this.store.dispatch(deleteUserAvatarRequest())
    this.url = this.api + this.defaultAvatar
  }

  selectFile(event: any) {
    this.store.dispatch(clearError())
    if(!event.target.files[0] || event.target.files[0].length == 0) {
      this.msg = 'You must select an image';
      return;
    }
    let mimeType = event.target.files[0].type;
    if (mimeType !== 'image/png' &&
      mimeType !== 'image/jpg' &&
      mimeType !== 'image/jpeg') {
      this.msg = "Only images(png/jpeg/jpg) are supported";
      return;
    }
    this.file = event.target.files[0];
    this.url = this.file;

    let reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = (_event) => {
      this.msg = "";
      this.url = reader.result;
    }
    event.target.value = ''
  }
}
