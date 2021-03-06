import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { StateWorkflow } from 'src/modals/StateWorkflow';
import { DbserviceService } from '../dbservice.service';
import { Task } from 'src/modals/Task';
import { ManageBoardService } from '../manage-board.service';
import * as moment from 'moment'
@Component({
  selector: 'app-statelist',
  templateUrl: './statelist.component.html',
  styleUrls: ['./statelist.component.scss']
})
export class StatelistComponent implements OnInit {

  @Input() state:StateWorkflow;
  taskList:Task[] = [];
  sortType:number = null;
  constructor(
    public dbService:DbserviceService,
    public manageBoardService:ManageBoardService
  ) { }

  ngOnInit(): void {
    this.getAllTasksForStateList();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes && changes['state'].currentValue){
      this.state = changes['state'].currentValue;
    }
  }

  getAllTasksForStateList(){
    this.dbService.getTasksFromStateId(this.state.state_id).subscribe(tasks => {
      if(tasks && tasks.length){
        this.taskList = tasks.map(task => {
          return new Task().deserialize(task);
        })
      }
    })
  }

  sortTaskByCreatedDate(){
    this.taskList = this.taskList.sort((task1, task2) => {
      let diff =  moment(task1.created_at).diff(moment(task2.created_at));
      return diff;
    }).slice();
  }

  sortTaskByTitle(){
    this.taskList.sort((task1, task2) => {
      return (task1.task_name > task2.task_name) ? 1:-1
    });
  }

  onSortValueSelect(event){
    let value = event.value;
    if(value == 1){
      this.sortTaskByCreatedDate();
    }else if(value == 2){
      this.sortTaskByTitle();
    }

  }

  removeTaskFromStateList(taskId:string){
    this.taskList = this.taskList.filter(task => {
      return task.task_id !== taskId
    })
  }

  

  

  

  

}
