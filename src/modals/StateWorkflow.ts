import { Deserialize } from './Deserialize.interface';

export class StateWorkflow implements Deserialize {
    state_id:string;
    state_name:string;
    created_at:string;
    created_by:number;
    order:number;
    board_id:number;
    constructor(){

    }

    deserialize(input:any){
        Object.assign(this, input);
        return this;
    }

    
}