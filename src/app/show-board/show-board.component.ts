import { Component, OnInit } from '@angular/core';
import { ManageBoardService } from '../manage-board.service';
import { StateWorkflow } from 'src/modals/StateWorkflow';

@Component({
  selector: 'app-show-board',
  templateUrl: './show-board.component.html',
  styleUrls: ['./show-board.component.scss']
})
export class ShowBoardComponent implements OnInit {
  stateLists:StateWorkflow[] = [];
  constructor(
    public manageBoard:ManageBoardService
  ) { }

  ngOnInit(): void {
    
  }

  

}
