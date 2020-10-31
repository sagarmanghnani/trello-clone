import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Task } from 'src/modals/Task';
import { StateWorkflow } from 'src/modals/StateWorkflow';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateStatelistComponent } from '../create-statelist/create-statelist.component';
import { Constants } from '../Constants';
import { User, Owner } from 'src/modals/User';
import { ManageBoardService } from '../manage-board.service';
import { DbserviceService } from '../dbservice.service';
import { MatSelect } from '@angular/material/select';
@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {

  mode:string;
  manageTask:Task = new Task();
  stateListInfo:StateWorkflow;
  allUsers:User[] = [];
  selectedOwners:number[] = [];
  ownersMap:Map<number, User> = new Map();
  @ViewChild('select')select:MatSelect
  constructor(
    public dialogRef: MatDialogRef<CreateTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public manageBoard:ManageBoardService,
    public dbService:DbserviceService
  ) { }

  ngOnInit(): void {
    this.stateListInfo = this.data.state_list_info;
    let mode = this.data.mode;
    this.mode = mode ?? Constants.MODE_CREATE;
    let existingTask:Task = this.data.existing_task;
    if(existingTask && existingTask.task_id){
      Object.assign(this.stateListInfo, existingTask);
    }
    this.getAllUsers();
  }


  getAllUsers(){
    this.manageBoard.fetchAllUsers().subscribe(res => {
      this.allUsers = res.users.map((user) => {
        return new Owner().deserialize(user);
      });
      this.createOwnersMap(this.allUsers);
      this.selectedOwners.push(this.manageBoard.boardUser.user_id);
    })
  }


  selectOwnersFortask(){
    this.select.open();
    console.log(this.selectedOwners);
  }

  createOwnersMap(users:User[]){
    users.forEach((user) => {
      this.ownersMap.set(user.user_id, user);
    })
  }

  showOwner(user_id:number){
    if(this.ownersMap.has(user_id)){
      return this.ownersMap.get(user_id).user_name
    }
  }

  removeOwner(userid:number){
    this.selectedOwners = this.selectedOwners.filter(userId => {
      return userId !== userid
    })
  }



}
