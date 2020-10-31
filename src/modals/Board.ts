import {Deserialize} from 'src/modals/Deserialize.interface';
import {StateWorkflow} from 'src/modals/StateWorkflow';
import { UtilsService } from 'src/app/utils.service';
import { state } from '@angular/animations';

export class Board implements Deserialize{
    state_ids:number[];
    board_id:number;
    initial_state:number;
    final_state:number;
    created_at:string;
    created_by:number;
    updated_at:string;
    board_name:string;

    constructor(){
        
    }

    deserialize(input:any) {
        Object.assign(this, input);
        return this;
    }

    addStateListToBoard(state_id:number){
        this.state_ids.push(state_id);
    }

    
}