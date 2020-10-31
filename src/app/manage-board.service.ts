import { Injectable } from '@angular/core';
import { Constants } from './Constants';
import { HttpClient } from '@angular/common/http';
import {GetUserList} from 'src/modals/GetUserList'
import { Observable } from 'rxjs';
import { User } from 'src/modals/User';
import { Board } from 'src/modals/Board';
@Injectable({
  providedIn: 'root'
})
export class ManageBoardService {
  GET_USERS:string = `assets/Users.json`;
  private _boardUser: User;
  private _board: Board;
 
  
  constructor(
    public httpClient:HttpClient
  ) { }

  //currently creating single instance of User
  fetchAllUsers():Observable<GetUserList> {
    let url = `${this.GET_USERS}`
    return this.httpClient.get<GetUserList>(url);
  }

  public get boardUser(): User {
    return this._boardUser;
  }
  public set boardUser(value: User) {
    this._boardUser = value;
  }

  public get board(): Board {
    return this._board;
  }
  public set board(value: Board) {
    this._board = value;
  }

  fetchAndSetBoardForUser(){
    let board:Board = JSON.parse(localStorage.getItem(`${Constants.BOARD}${this._boardUser.user_id}`));
    if(!board){
      let createdBoard = this._boardUser.createBoard('Board 1');
      localStorage.setItem(`${Constants.BOARD}$${this._boardUser.user_id}`, JSON.stringify(createdBoard));
      this.board = createdBoard;
    }else{
      this.board = board;
    }
  }

  

}
