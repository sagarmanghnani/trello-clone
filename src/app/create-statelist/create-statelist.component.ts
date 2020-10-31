import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {StateWorkflow} from 'src/modals/StateWorkflow';
import { UtilsService } from '../utils.service';
import { ManageBoardService } from '../manage-board.service';
import { DbserviceService } from '../dbservice.service';

@Component({
  selector: 'app-create-statelist',
  templateUrl: './create-statelist.component.html',
  styleUrls: ['./create-statelist.component.scss']
})
export class CreateStatelistComponent implements OnInit {
  state:StateWorkflow = new StateWorkflow();
  constructor(
    public dialogRef: MatDialogRef<CreateStatelistComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public manageBoard:ManageBoardService,
    public dbService:DbserviceService
  ) { }

  ngOnInit(): void {
    
  }

  validateStateList(){
    if(!this.state.state_name){
      this.manageBoard.presentSnackBar("Please enter list name to continue");
      return false;
    }
    return true;
  }

  addStateListToBoard(){
    let status = this.validateStateList();
    if(!status){
      return;
    }else{
      this.state.created_at = UtilsService.currentDateTime();
      this.state.created_by = this.manageBoard.boardUser.user_id;
      let serializedObj = {};
      Object.assign(serializedObj, this.state);
      console.log(serializedObj, "serialized obj");
      this.dbService.createNewStateList(serializedObj).then(() => {
        this.manageBoard.presentSnackBar("List added successfully")
      })
    }
  }

  

  


  

  


}
