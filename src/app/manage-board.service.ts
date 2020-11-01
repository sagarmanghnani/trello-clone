import { Injectable, EventEmitter } from '@angular/core';
import { Constants } from './Constants';
import { HttpClient } from '@angular/common/http';
import {GetUserList} from 'src/modals/GetUserList'
import { Observable } from 'rxjs';
import { User } from 'src/modals/User';
import { Board } from 'src/modals/Board';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { UtilsService } from './utils.service';
import { StateWorkflow } from 'src/modals/StateWorkflow';
@Injectable({
  providedIn: 'root'
})
export class ManageBoardService {
  GET_USERS:string = `assets/Users.json`;
  onBoardFetchEvent:EventEmitter<any> = new EventEmitter();

  private _boardUser: User;
  private _board: Board;
  private _stateMaxOrderCount: number;
  private _userMap: Map<number, User> = new Map();
  public get userMap(): Map<number, User> {
    return this._userMap;
  }
  public set userMap(value: Map<number, User>) {
    this._userMap = value;
  }

  
  constructor(
    public httpClient:HttpClient,
    public snackBar:MatSnackBar
  ) { 
      this._stateMaxOrderCount = 0;
  }

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

  public get stateMaxOrderCount(): number {
    return this._stateMaxOrderCount;
  }
  public set stateMaxOrderCount(value: number) {
    this._stateMaxOrderCount = value;
  }

  fetchAndSetBoardForUser(){
    let board = JSON.parse(localStorage.getItem(`${Constants.BOARD}${this._boardUser.user_id}`));
    if(!board){
      let createdBoard = this._boardUser.createBoard('Board 1');
      localStorage.setItem(`${Constants.BOARD}${this._boardUser.user_id}`, JSON.stringify(createdBoard));
      this.board = createdBoard;
    }else{
      this.board = new Board().deserialize(board);
    }
    this.onBoardFetchEvent.emit();
  }

  

  presentSnackBar(msg:string){
    this.snackBar.open(msg, null, {
      duration:1000
    })
  }

  

  

  

  

}
