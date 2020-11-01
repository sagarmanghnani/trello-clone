import { UtilsService } from 'src/app/utils.service';
import { Deserialize } from './Deserialize.interface';

export class Task implements Deserialize {
    task_id:string;
    task_name:string;
    description:string;
    attachments:string[] = [];
    owners_ids:number[] = [];
    created_at:string;
    updated_at:string;
    created_by:number;
    state_id:string;
    assigned_to:number[] = [];

    constructor(){
        this.created_at = UtilsService.currentDateTime();
        this.updated_at = UtilsService.currentDateTime();
    }

    separateUrlFromType(attachmentStr:string){
        let lastIndexOfDelimeter = attachmentStr.lastIndexOf('$');
        let name = attachmentStr.slice(lastIndexOfDelimeter + 1);
        let lastIndexOfDot = name.lastIndexOf('.');
        return {
            url:attachmentStr.slice(0, lastIndexOfDelimeter),
            name:attachmentStr.slice(lastIndexOfDelimeter + 1),
            type:name.slice(lastIndexOfDot + 1)
        }

    }

    deserialize(input:any) {
        Object.assign(this, input);
        return this;
    }


}