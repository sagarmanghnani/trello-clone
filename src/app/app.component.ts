import { Component } from '@angular/core';
import {Board} from 'src/modals/Board';
import {ManageBoardService} from './manage-board.service'
import { Constants } from './Constants';
import { User, Owner } from 'src/modals/User';
// import { NgxIndexedDBService } from 'ngx-indexed-db';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    public manageBoardService:ManageBoardService,
    
  ){
    
  }


  ngOnInit() {
    this.assignUser();
  }

  assignUser(){
    this.manageBoardService.fetchAllUsers().subscribe(userWrapper => {
      if(userWrapper && userWrapper.users && userWrapper.users.length){
        let boarduser = userWrapper.users.find(user => {
          return user.user_id === Constants.CURRENT_USER_ID;
        })
       

        if(boarduser){
          this.manageBoardService.boardUser = new Owner().deserialize(boarduser) ;
        }
        this.assignBoard();
      }
    })
 }

 assignBoard(){
   this.manageBoardService.fetchAndSetBoardForUser();
 }





}
