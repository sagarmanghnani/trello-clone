import { Deserialize } from './Deserialize.interface';

export class StateWorkflow implements Deserialize {
    state_id:number;
    state_name:string;
    created_at:string;
    created_by:number;

    constructor(){

    }

    deserialize(input:any){
        Object.assign(this, input);
        return this;
    }

    
}