import {Component, Input, OnInit} from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {IUser} from "../../../../models/IUser";
import {ModalService} from "../../../../services/modal.service";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  @Input() user: IUser
  api = environment.URL;

  isImageLoaded = true;

  constructor(public modalService: ModalService) { }

  ngOnInit(): void {
  }

  onLoad() {
    this.isImageLoaded = false;
  }

}
