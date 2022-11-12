import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Credentials} from "../models/IUser";
import { urls } from "../contants/urls";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(user: Credentials): Observable<Credentials> {
    return this.http.post<Credentials>(urls.auth + '/register', user)
  }

  login(user: Credentials): Observable<any> {
    return this.http.post<Credentials>(urls.auth + '/login', user, {
      withCredentials: true
    })
  }

  isAuthorized(): Observable<any> {
    return this.http.get(urls.auth + '/check', {
      withCredentials: true
    })
  }

  logout(): Observable<any> {
    return this.http.get(urls.auth + '/logout', {
      withCredentials: true
    })
  }


}
