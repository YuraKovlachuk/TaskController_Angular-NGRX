import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {urls} from "../contants/urls";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  uploadUserAvatar(data: FormData) {
    return this.http.patch<{avatar: string}>(`${urls.user}/me/upload`, data, {
      withCredentials: true
    })
  }

  deleteUserAvatar() {
    return this.http.delete(`${urls.user}/me/avatar`, {
      withCredentials: true
    })
  }

  editUsername(username: string) {
    return this.http.patch<{username: string}>(`${urls.user}/me/username`, {username}, {
      withCredentials: true
    })
  }

  changePassword(oldPassword:string , newPassword: string) {
    return this.http.patch<{ message: string }>(`${urls.user}/me/password`, {oldPassword, newPassword}, {
      withCredentials: true
    })
  }

  deleteUser() {
    return this.http.delete(`${urls.user}/me`, {withCredentials: true})
  }
}
