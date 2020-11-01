import {Board} from './Board'
import * as moment from 'moment';
import { Deserialize } from './Deserialize.interface';
import { UtilsService } from 'src/app/utils.service';

export abstract class User implements Deserialize{
    user_id:number;
    user_name:string;
    created_at:string;
    created_by:number;
    color_rep:string;

    abstract createBoard(name?:string);
    abstract deserialize(input:any);
    abstract showNameInitials();
}

export class Owner extends User{
    createBoard(name?:string){
        let board = new Board();
        board.created_by = this.user_id;
        board.created_at = moment().format('YYYY-MM-DD');
        board.board_id = UtilsService.generateRandomId();
        board.board_name = name;
        return board;
    }

    deserialize(input:any) {
        Object.assign(this, input);
        return this;
    }

    showNameInitials(){
        let splittedArr = this.user_name.split(' ');
        let initials = '';
        splittedArr.forEach(initial => {
            initials += initial[0].toUpperCase();
        })
        return initials;
    }
}