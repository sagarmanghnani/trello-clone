import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Task } from 'src/modals/Task';
import { User } from 'src/modals/User';
import { UtilsService } from '../utils.service';
import { MatDialog } from '@angular/material/dialog';
import { Constants } from '../Constants';
import { StateWorkflow } from 'src/modals/StateWorkflow';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { DbserviceService } from '../dbservice.service';
import { ManageBoardService } from '../manage-board.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @Input() task:Task;
  @Input() usersMap:Map<number, User>;
  @Input() stateInfo:StateWorkflow;
  constructor(
    public dialog:MatDialog,
    public dbService:DbserviceService,
    public manageBoardService:ManageBoardService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes && changes['task'].currentValue){
      this.task = changes['task'].currentValue;
    }

    if(changes && changes['usersMap'].currentValue){
      this.usersMap = changes['usersMap'].currentValue;
    }
    
  }

  showUserByUserId(userId:number){
    if(this.usersMap.has(userId)){
      return this.usersMap.get(userId).showNameInitials();
    }
  }

  prettyPrintDateTime(dateTime:string){
    return UtilsService.showStandardDateTime(dateTime);
  }

  editTask(){
    let dialogRef = this.dialog.open(CreateTaskComponent, {
      data:{
        state_list_info:this.stateInfo,
        mode:Constants.MODE_EDIT,
        existing_task:this.task
      },
      width: '600px',
      panelClass:'my-panel'
    })
  }

  deleteTask(){
    event.stopPropagation();
    this.dbService.deleteTaskFromTaskId(this.task.task_id).then(() => {
      this.manageBoardService.presentSnackBar("Task deleted");
    })
  }

  showUserColorRepByUserId(userId:number){
    if(this.usersMap.has(userId)){
      return this.usersMap.get(userId).color_rep;
    }
  }

  startState(){
    if(this.stateInfo.order === this.manageBoardService.stateMinOrderCount){
      return true;
    }return false;
  }

  checkInprogressState(){
    if((this.stateInfo.order != this.manageBoardService.stateMinOrderCount) && (this.stateInfo.order != this.manageBoardService.stateMaxOrderCount)){
      return true;
    }return false;
  }


}
