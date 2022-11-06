import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {boardResponse, IBoard} from "../models/IBoard";
import {urls} from "../contants/urls";

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(private http: HttpClient) { }

  getAllBoards() : Observable<boardResponse>{
    return this.http.get<boardResponse>(urls.board + '/', {
      withCredentials: true
    })
  }

  addBoard(board: IBoard) : Observable<IBoard> {
    return this.http.post<IBoard>(urls.board + '/', board,{
      withCredentials: true
    })
  }

  deleteBoard(boardId: string) : Observable<string> {
    return this.http.delete<string>(urls.board + `/${boardId}`, {
      withCredentials: true
    })
  }

  editBoard(board: IBoard) : Observable<IBoard> {
    return this.http.patch<IBoard>(urls.board + `/${board._id}`, board, {
      withCredentials: true
    })
  }

  editColumnColor(boardId: string, color: string, column: string) {
    return this.http.patch(urls.board + `/${boardId}`, {boardId, color, column} , {
      withCredentials: true
    })
  }
}
