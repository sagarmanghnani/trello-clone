import { Component, OnInit } from '@angular/core';
import { ManageBoardService } from '../manage-board.service';
import { StateWorkflow } from 'src/modals/StateWorkflow';
import { DbserviceService } from '../dbservice.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { Constants } from '../Constants';

@Component({
  selector: 'app-show-board',
  templateUrl: './show-board.component.html',
  styleUrls: ['./show-board.component.scss']
})
export class ShowBoardComponent implements OnInit {
  stateLists:StateWorkflow[] = [];
  constructor(
    public manageBoard:ManageBoardService,
    public dbService:DbserviceService,
    public dialog:MatDialog
  ) { }

  ngOnInit(): void {
    this.manageBoard.onBoardFetchEvent.subscribe(() => {
      this.getAllStates();
    })
  }

  getAllStates(){
    this.dbService.fetchAllStatesForBoardId(this.manageBoard.board.board_id).subscribe(res => {
      if(res && res.length){
        this.stateLists = res.map(state => {
          return new StateWorkflow().deserialize(state);
        });

        this.manageBoard.board.sortStatesListOnOrder(this.stateLists);
        this.manageBoard.stateMaxOrderCount = this.stateLists[this.stateLists.length - 1].order;
        console.log(this.stateLists, "stateslist");
      }
      
    },
    (err) => {
      this.manageBoard.presentSnackBar("Something went wrong");
    }
    )
  }


  createTask(){
    let dialogRef = this.dialog.open(CreateTaskComponent, {
      data:{
        state_list_info:this.stateLists[0],
        mode:Constants.MODE_CREATE,
      },
      width: '600px',
      panelClass:'my-panel'
    })
  }

}
