import { Component, OnInit } from '@angular/core';
import { ManageBoardService } from '../manage-board.service';
import { StateWorkflow } from 'src/modals/StateWorkflow';
import { DbserviceService } from '../dbservice.service';

@Component({
  selector: 'app-show-board',
  templateUrl: './show-board.component.html',
  styleUrls: ['./show-board.component.scss']
})
export class ShowBoardComponent implements OnInit {
  stateLists:StateWorkflow[] = [];
  constructor(
    public manageBoard:ManageBoardService,
    public dbService:DbserviceService
  ) { }

  ngOnInit(): void {
    
  }

  getAllStates(){
    this.dbService.fetchAllStatesForBoardId(this.manageBoard.board.board_id).subscribe(res => {
      if(res && res.length){
        this.stateLists = res.map(state => {
          return new StateWorkflow().deserialize(state);
        });

        this.manageBoard.board.sortStatesListOnOrder(this.stateLists);
        this.manageBoard.stateMaxOrderCount = this.stateLists[this.stateLists.length - 1].order;
      }
      
    },
    (err) => {
      this.manageBoard.presentSnackBar("Something went wrong");
    }
    )
  }

}
