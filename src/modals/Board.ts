import { UtilsService } from 'src/app/utils.service';
import {Deserialize} from 'src/modals/Deserialize.interface'
export class Board implements Deserialize{
    state_ids:number[];
    board_id:number;
    initial_state:number;
    final_state:number;
    created_at:string;
    created_by:number;
    updated_at:string;
    board_name:string;

    constructor(name:string){
        this.board_name = name ?? 'New Board';
        this.board_id = UtilsService.generateRandomId();
    }

    deserialize(input:any) {
        Object.assign(this, input);
        return this;
    }

    
}