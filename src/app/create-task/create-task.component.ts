import { Component, OnInit, Inject, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { Task } from 'src/modals/Task';
import { StateWorkflow } from 'src/modals/StateWorkflow';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateStatelistComponent } from '../create-statelist/create-statelist.component';
import { Constants } from '../Constants';
import { User, Owner } from 'src/modals/User';
import { ManageBoardService } from '../manage-board.service';
import { DbserviceService } from '../dbservice.service';
import { MatSelect } from '@angular/material/select';
import { UtilsService } from '../utils.service';
import { NgxSpinnerService } from 'ngx-spinner';
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
  @ViewChild('select')select:MatSelect;
  @ViewChild('attachmentUpload')attachmentUpload:ElementRef
  availableStatesForTransition:StateWorkflow[] = [];
  previousStatusId:string;
  constructor(
    public dialogRef: MatDialogRef<CreateTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public manageBoard:ManageBoardService,
    public dbService:DbserviceService,
    public ngxSpinner:NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.stateListInfo = this.data.state_list_info;
    let mode = this.data.mode;
    this.mode = mode ?? Constants.MODE_CREATE;
    let existingTask:Task = this.data.existing_task;
    if(existingTask && existingTask.task_id){
      Object.assign(this.manageTask, existingTask);
      this.previousStatusId = this.manageTask.state_id;
    }
    this.getAllUsers();
    this.getAllStatesForBoard();
  }


  getAllUsers(){
    this.ngxSpinner.show();
    this.manageBoard.fetchAllUsers().subscribe(res => {
      this.ngxSpinner.hide();
      this.allUsers = res.users.map((user) => {
        return new Owner().deserialize(user);
      });
      this.createOwnersMap(this.allUsers);
      if(this.mode === Constants.MODE_CREATE){
        this.manageTask.owners_ids.push(this.manageBoard.boardUser.user_id);
      }

    },
    (err) => {
      this.ngxSpinner.hide();
    }
    )
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
    this.manageTask.owners_ids = this.manageTask.owners_ids.filter(userId => {
      return userId !== userid
    })
  }

  uploadImage(){
    this.attachmentUpload.nativeElement.click()
  }

  addAttachments(event){
    let file = (event.target.files[0]);
    this.dbService.uploadAttachment(file, file.name, file.type).then((downloadUrl:string) => {
      this.manageTask.attachments.push(`${downloadUrl}$${file.name}`);
    });
  }

  validateTask(){
    if(!this.manageTask.task_name){
      this.manageBoard.presentSnackBar("Please enter name to continue");
      return false;
    }

    if(this.manageTask.task_name.length < 5 || this.manageTask.task_name.length > 20){
      this.manageBoard.presentSnackBar("Please enter name between 5 to 20 characters");

      return false;
    }
    return true;
  }

  createTask(){
    let status = this.validateTask();
    if(!status){
      return;
    }
    let taskToCreate = {};
    this.manageTask.state_id = this.stateListInfo.state_id;
    this.manageTask.owners_ids
    this.dbService.createNewTask(Object.assign(taskToCreate, this.manageTask)).then(() => {
      this.manageBoard.presentSnackBar("Task added successfully");
      this.dialogRef.close();
    });    
  }

  editTask(){
    let status = this.validateTask();
    if(!status){
      return;
    }
    let taskToEdit = {};
    this.manageTask.state_id = this.stateListInfo.state_id;
    this.manageTask.updated_at = UtilsService.currentDateTime();
    this.dbService.updateTask(this.manageTask.task_id, Object.assign(taskToEdit, this.manageTask)).then(() => {
      
      this.manageBoard.presentSnackBar("Task updated successfully");
      this.dialogRef.close({
        state_id:this.manageTask.state_id
      });

    });
  }

  getAllStatesForBoard(){
    this.ngxSpinner.show();
    this.dbService.fetchAllowedStatesForBoardId(this.stateListInfo.board_id, this.stateListInfo.order).subscribe(res => {
      this.ngxSpinner.hide();
      this.availableStatesForTransition = res;
    },
    (err) => {
      this.ngxSpinner.hide();
    }
    )
  }

  assignNewState(event){
      this.stateListInfo = this.availableStatesForTransition.find((state) => {
        return state.state_id === event.value;
      })
  }



}
