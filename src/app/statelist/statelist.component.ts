import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { StateWorkflow } from 'src/modals/StateWorkflow';

@Component({
  selector: 'app-statelist',
  templateUrl: './statelist.component.html',
  styleUrls: ['./statelist.component.scss']
})
export class StatelistComponent implements OnInit {

  @Input() state:StateWorkflow
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes && changes['state'].currentValue){
      this.state = changes['state'].currentValue;
    }
  }

  

  

  

}
