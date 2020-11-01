import { Component } from '@angular/core';
import {Board} from 'src/modals/Board';
import {ManageBoardService} from './manage-board.service'
import { Constants } from './Constants';
import { User, Owner } from 'src/modals/User';
import { NgxSpinnerService } from 'ngx-spinner';

// import { NgxIndexedDBService } from 'ngx-indexed-db';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    public manageBoardService:ManageBoardService,
    public ngxSpinner:NgxSpinnerService
  ){
    
  }


  ngOnInit() {
    this.assignUser();
  }

  assignUser(){
    this.ngxSpinner.show();
    this.manageBoardService.fetchAllUsers().subscribe(userWrapper => {
      this.ngxSpinner.hide();
      if(userWrapper && userWrapper.users && userWrapper.users.length){
        let boarduser = userWrapper.users.find(user => {
          return user.user_id === Constants.CURRENT_USER_ID;
        })
       

        if(boarduser){
          this.manageBoardService.boardUser = new Owner().deserialize(boarduser) ;
        }
        this.assignBoard();
      }
    },
    (err) => {
      this.ngxSpinner.hide();
    }
    )
 }

 assignBoard(){
   this.manageBoardService.fetchAndSetBoardForUser();
 }





}
